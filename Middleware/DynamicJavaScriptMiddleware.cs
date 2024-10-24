using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;

public class DynamicJavaScriptMiddleware
{

    private readonly ILogger<DynamicJavaScriptMiddleware> _logger;

    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _env;

    public DynamicJavaScriptMiddleware(RequestDelegate next, ILogger<DynamicJavaScriptMiddleware> logger, IWebHostEnvironment env)
    {
        _logger = logger;
        _next = next;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var osfLogo = new OSFLogo();
        var button = new ButtonSVG();
        var parentContainer = new ParentContainer();
        var webpage = new Webpage();

        context.Response.ContentType = "application/javascript";
//        string jsContent = await ReadJavaScriptFileAsync("osf-logo.js");
        var jsContent = await ReadJavaScriptFileAsync("webpage.js");
        var svg = jsContent;

        if (context.Request.Path.Value.EndsWith(".js"))
        {
	    switch (context.Request.Path.Value)
	    {
		case "/foo.js": svg = await osfLogo.SVG(svg, _env);
		    await context.Response.WriteAsync(svg);
		    return;
		break;
                case "/juliaswitch.js": svg = await webpage.Juliaswitch(svg, _env, "#734f96");
                    await context.Response.WriteAsync(svg);
                    return;
                case "/button.js": svg = await button.SVG("{{contents}}", _env);
                    await context.Response.WriteAsync(svg);
                    return;
                case "/parent-container.js": svg = await parentContainer.SVG("{{contents}}", _env);
                    await context.Response.WriteAsync(svg);
                    return;
		default:
    _logger.LogInformation("it's this default thing");
    _logger.LogInformation("Request path: {Path}", context.Request.Path.Value);
   		break;
	    };
	
        }
            await _next(context);

/*        if (context.Request.Path.Value.EndsWith("/foo.js"))
        {
            context.Response.ContentType = "application/javascript";
	    string jsContent = await ReadJavaScriptFileAsync("osf-logo.js");
	    string modifiedContent = await ModifyJavaScriptContent(jsContent);
	    await context.Response.WriteAsync(modifiedContent);
	    return;
        }

        await _next(context);*/
    }

    private async Task<string> ReadJavaScriptFileAsync(string fileName)
    {
	string filePath = Path.Combine(_env.WebRootPath, fileName);
	if (!File.Exists(filePath))
	{
	    throw new FileNotFoundException($"The file {fileName} was not found in wwwroot.");
	}
	return await File.ReadAllTextAsync(filePath);
    }

    private string GenerateDynamicJavaScript()
    {
        // Generate your dynamic JavaScript content here
        return "console.log('This is a dynamic JavaScript response!');";
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
