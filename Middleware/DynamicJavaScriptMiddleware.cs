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
	    string modifiedContent = await ModifyJavaScriptContent(jsContent);
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

    private async Task<string> ModifyJavaScriptContent(string content)
    {
        //string xContent = content.Replace("{{vX}}", "15");
        //string yContent= xContent.Replace("{{vY}}", "30");
        //return yContent.Replace("{{interval}}", "33");
        Lightning lightning = new Lightning();

        string bolt = await lightning.Bolt(_env, 60, 30, 30, 200, 4, 0);
        string bolt2 = await lightning.Bolt(_env, 120, 30, 100, 200, 6, 2);
        string bolt3 = await lightning.Bolt(_env, 250, 30, 160, 200, 5, 4);

        content = content.Replace("{{lightningBolt1}}", bolt);
        content = content.Replace("{{lightningBolt2}}", bolt2);
        content = content.Replace("{{lightningBolt3}}", bolt3);

        OpenSourceForce openSourceForce = new OpenSourceForce();
        string openSourceForceText = await openSourceForce.Text(_env);
        
        return content.Replace("{{openSourceForceText}}", openSourceForceText);
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
