using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
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
        Test test = new Test();
        OSFLogo osfLogo = new OSFLogo();
        ButtonSVG button = new ButtonSVG();
        Webpage webpage = new Webpage();

//        string jsContent = await ReadJavaScriptFileAsync("osf-logo.js");
        string jsContent = await ReadJavaScriptFileAsync("webpage.js");
        string svg = jsContent;

        if (context.Request.Path.Value.EndsWith(".glb"))
        {
            context.Response.ContentType = "model/gltf-binary";
            byte[] fileBytes = await ReadBinaryFileAsync("LowPoly_Chicken_Model.glb");
            await context.Response.Body.WriteAsync(fileBytes, 0, fileBytes.Length);
            return;
        }

        if (context.Request.Path.Value.EndsWith(".js"))
        context.Response.ContentType = "application/javascript";
        {
	    switch (context.Request.Path.Value)
	    {
		case "/foo.js": svg = await osfLogo.SVG(svg, _env);
		    await context.Response.WriteAsync(svg);
    Console.WriteLine(svg);
		    return;
		break;
                case "/juliaswitch.js": svg = await webpage.Juliaswitch(svg, _env, "#734f96");
                    await context.Response.WriteAsync(svg);
                    return;
                case "/button.js": svg = await button.SVG("{{contents}}", _env);
                    await context.Response.WriteAsync(svg);
                    return;
                case "/canvas-test.js": 
                    svg = await test.CanvasSVG("{{contents}}", _env);
                    await context.Response.WriteAsync(svg);
                    return;
                case "/canvas-pes-test.js": svg = await test.PESSVG("{{contents}}", _env);
                    await context.Response.WriteAsync(svg);
                    return;
                case "/threejs.js": svg = await test.ThreejsSVG("{{contents}}", _env);
                    await context.Response.WriteAsync(svg);
                    return;
                case "/three-d.js": svg = await test.ThreeDModelSVG("{{contents}}", _env);
                    await context.Response.WriteAsync(svg);
                    return;
		default:
    Console.WriteLine("it's this default thing");
    Console.WriteLine(context.Request.Path.Value);
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

    private async Task<byte[]> ReadBinaryFileAsync(string fileName)
    {
	string filePath = Path.Combine(_env.WebRootPath, fileName);
	if (!File.Exists(filePath))
	{
	    throw new FileNotFoundException($"The file {fileName} was not found in wwwroot.");
	}
	return await File.ReadAllBytesAsync(filePath);
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
