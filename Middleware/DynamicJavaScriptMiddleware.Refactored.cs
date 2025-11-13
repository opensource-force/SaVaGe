using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using SaVaGe.Middleware.ComponentProcessors;

/// <summary>
/// Refactored middleware using convention-based routing.
/// Components are auto-discovered from wwwroot structure. Custom C# logic only needed for processors.
///
/// Usage:
/// - Request: GET /ui/button.js?text=Click&color=blue
/// - Auto-loads: wwwroot/ui/button/button.js + wwwroot/ui/button/button.svg
/// - Auto-replaces: {{text}} → "Click", {{color}} → "blue"
/// - Returns: JavaScript with embedded SVG
///
/// For custom logic, register an IComponentProcessor implementation.
/// </summary>
public class DynamicJavaScriptMiddleware
{
    private readonly ILogger<DynamicJavaScriptMiddleware> _logger;
    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _env;
    private readonly ComponentProcessorRegistry _processorRegistry;

    public DynamicJavaScriptMiddleware(
        RequestDelegate next,
        ILogger<DynamicJavaScriptMiddleware> logger,
        IWebHostEnvironment env,
        ComponentProcessorRegistry processorRegistry)
    {
        _logger = logger;
        _next = next;
        _env = env;
        _processorRegistry = processorRegistry;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Only intercept .js requests
        if (!context.Request.Path.Value?.EndsWith(".js") ?? true)
        {
            await _next(context);
            return;
        }

        try
        {
            var result = await ProcessComponentRequest(context);

            if (result != null)
            {
                context.Response.ContentType = "application/javascript";
                await context.Response.WriteAsync(result);
                return;
            }
        }
        catch (FileNotFoundException ex)
        {
            _logger.LogWarning("Component template not found: {Message}", ex.Message);
            // Fall through to next middleware
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing component request: {Path}", context.Request.Path);
            // Fall through to next middleware
        }

        await _next(context);
    }

    private async Task<string?> ProcessComponentRequest(HttpContext context)
    {
        var requestPath = context.Request.Path.Value;

        // Special handling for svg-pes-* pattern (SVG Particle Emitters)
        if (requestPath.StartsWith("/svg-pes-"))
        {
            return await ProcessParticleEmitter(context, requestPath);
        }

        // Extract component path (e.g., "/ui/button.js" → "ui/button")
        var componentPath = ExtractComponentPath(requestPath);

        _logger.LogInformation("Processing component: {ComponentPath}", componentPath);

        // Get template replacements (either from custom processor or query params)
        var replacements = await GetReplacements(context, componentPath);

        // Load templates from wwwroot
        var jsTemplate = await TryLoadTemplate($"{componentPath}/{GetFileName(componentPath)}.js");
        var svgTemplate = await TryLoadTemplate($"{componentPath}/{GetFileName(componentPath)}.svg");

        if (jsTemplate == null && svgTemplate == null)
        {
            _logger.LogWarning("No templates found for component: {ComponentPath}", componentPath);
            return null;
        }

        // Process templates with replacements
        return ProcessTemplates(jsTemplate, svgTemplate, replacements);
    }

    private async Task<string> ProcessParticleEmitter(HttpContext context, string requestPath)
    {
        // Extract emitter name from path: "/svg-pes-MAGICFire.js" → "MAGICFire"
        var emitterName = requestPath
            .Replace("/svg-pes-", "")
            .Replace(".js", "");

        var query = context.Request.Query;
        var x = query["x"].ToString() ?? "0";
        var y = query["y"].ToString() ?? "0";

        _logger.LogInformation("Processing particle emitter: {Emitter} at ({X}, {Y})", emitterName, x, y);

        // Use SVGParticleEmitter processor
        var processor = _processorRegistry.GetProcessor("particle-emitters/svg-particle-emitter");

        if (processor != null)
        {
            var replacements = await processor.GetReplacements(context, _env);
            replacements["emitterName"] = emitterName;
            replacements["x"] = x;
            replacements["y"] = y;

            var template = await TryLoadTemplate("particle-emitters/svg-particle-emitter/svg-particle-emitter.js");
            return ProcessTemplates(template, null, replacements) ?? "";
        }

        throw new FileNotFoundException($"Particle emitter processor not found: {emitterName}");
    }

    private async Task<Dictionary<string, string>> GetReplacements(HttpContext context, string componentPath)
    {
        // Try to get custom processor
        var processor = _processorRegistry.GetProcessor(componentPath);

        if (processor != null)
        {
            _logger.LogInformation("Using custom processor for: {ComponentPath}", componentPath);
            return await processor.GetReplacements(context, _env);
        }

        // Auto-map query parameters to replacements
        _logger.LogInformation("Using auto-mapped query parameters for: {ComponentPath}", componentPath);
        return context.Request.Query.ToDictionary(
            kvp => kvp.Key,
            kvp => kvp.Value.ToString()
        );
    }

    private async Task<string?> TryLoadTemplate(string relativePath)
    {
        try
        {
            return await _env.ReadFileFromWebRootAsync(relativePath);
        }
        catch (FileNotFoundException)
        {
            return null;
        }
    }

    private string ProcessTemplates(string? jsTemplate, string? svgTemplate, Dictionary<string, string> replacements)
    {
        var result = jsTemplate ?? "";

        // If we have an SVG template, embed it into the JS template's {{contents}} placeholder
        if (svgTemplate != null)
        {
            var processedSvg = ApplyReplacements(svgTemplate, replacements);
            replacements["contents"] = processedSvg;
        }

        // Apply all replacements to the JS template
        result = ApplyReplacements(result, replacements);

        return result;
    }

    private string ApplyReplacements(string template, Dictionary<string, string> replacements)
    {
        foreach (var (key, value) in replacements)
        {
            // Replace {{key}} with value (server-side mustache)
            template = template.Replace($"{{{{{key}}}}}", value);
        }

        return template;
    }

    private string ExtractComponentPath(string requestPath)
    {
        // Remove leading slash and trailing .js
        // "/ui/button.js" → "ui/button"
        return requestPath
            .TrimStart('/')
            .Replace(".js", "")
            .TrimEnd('/');
    }

    private string GetFileName(string componentPath)
    {
        // Extract last segment of path
        // "ui/button" → "button"
        // "containers/dialog-box" → "dialog-box"
        var segments = componentPath.Split('/');
        return segments.Last();
    }
}

// Extension method used to add the middleware to the HTTP request pipeline.
public static class DynamicJavaScriptMiddlewareExtensions
{
    public static IApplicationBuilder UseDynamicJavaScript(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<DynamicJavaScriptMiddleware>();
    }
}

public static class WebHostEnvironmentExtensions
{
    public static async Task<string> ReadFileFromWebRootAsync(this IWebHostEnvironment env, string fileName)
    {
        string filePath = Path.Combine(env.WebRootPath, fileName);
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"The file {fileName} was not found in wwwroot.");
        }
        return await File.ReadAllTextAsync(filePath);
    }
}
