using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

public class DynamicJavaScriptMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _env;

    public DynamicJavaScriptMiddleware(RequestDelegate next, IWebHostEnvironment env)
    {
        _next = next;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.Value.EndsWith("/foo.js"))
        {
            context.Response.ContentType = "application/javascript";
	    string jsContent = await ReadJavaScriptFileAsync("osf-logo.js");
	    string modifiedContent = ModifyJavaScriptContent(jsContent);
	    await context.Response.WriteAsync(modifiedContent);
	    return;
        }

        await _next(context);
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

    private string ModifyJavaScriptContent(string content)
    {
        string xContent = content.Replace("{{vX}}", "15");
        string yContent= xContent.Replace("{{vY}}", "30");
        return yContent.Replace("{{interval}}", "33");
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
