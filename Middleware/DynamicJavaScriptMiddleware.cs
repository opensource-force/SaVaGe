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
        var background = new Background();
        var parentContainer = new ParentContainer();
        var webpage = new Webpage();
        var gameScene = new GameScene();
        var svgParticleEmitter = new SVGParticleEmitter();
        var dialogBox = new DialogBox();

        context.Response.ContentType = "application/javascript";
//        string jsContent = await ReadJavaScriptFileAsync("osf-logo.js");
        var jsContent = await ReadJavaScriptFileAsync("containers/webpage/webpage.js");
        var svg = jsContent;
        var queryParams = context.Request.Query;

        if (context.Request.Path.Value.EndsWith(".js"))
        {
Console.WriteLine(context.Request.Path.Value);
            if (context.Request.Path.Value.StartsWith("/svg-pes-")) 
            {
		  var stack = new Stack<string>(context.Request.Path.Value.Split("-"));
                  var emitterjs = stack.Pop();
                  var emitter = emitterjs.Split(".")[0];
                  
                  var screenPositionX = queryParams["x"].ToString() ?? "";
                  var screenPositionY = queryParams["y"].ToString() ?? "";

		  var svgEmitter = await svgParticleEmitter.SVG("{{contents}}", _env, emitter, screenPositionX, screenPositionY);
		  await context.Response.WriteAsync(svgEmitter);
		  return;
            }
	    switch (context.Request.Path.Value)
	    {
                case "/the-advancement.js": svg = await webpage.TheAdvancement(svg, _env);
                    var pest = new SVGParticleEmitter();
                    var magicFiret = await pest.SVG("{{contents}}", _env, "MAGICFire", "300", "400");
                    svg = svg.Replace("{{additionalJS}}", magicFiret);
                    await context.Response.WriteAsync(svg);
                    return;
                case "/magic-and-teleportation.js": svg = await webpage.MAGICAndTeleportation(svg, _env);
                    var pes = new SVGParticleEmitter();
                    var magicFire = await pes.SVG("{{contents}}", _env, "MAGICFire", "300", "400");
                    svg = svg.Replace("{{additionalJS}}", magicFire);
                    await context.Response.WriteAsync(svg);
                    return;
                case "/linear-gradient.js": svg = await background.GradientSVG(svg, _env);
                    await context.Response.WriteAsync(svg);
                    return;
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
                case "/parent-container.js": 
                    var parentElementId = queryParams["parentElementId"].ToString() ?? "parent";
                    var decoration = queryParams["decoration"].ToString() ?? "";
                    svg = await parentContainer.SVG("{{contents}}", _env, parentElementId, decoration);
                    await context.Response.WriteAsync(svg);
                    return;
                case "/game-scene.js":
                    var decoration2 = queryParams["decoration"].ToString() ?? "";
                    var adStrings = "['ads_', 'ad-', 'ads-', 'googlesyndication', 'pagead2', 'fixed-ad']";
                    var scene = await gameScene.SVG("{{contents}}", _env, adStrings, decoration2);
                    await context.Response.WriteAsync(scene);
                    return;
                case "/speakeasy.js":
                    var speakeasy = await _env.ReadFileFromWebRootAsync("containers/speakeasy/speakeasy.js");
                    await context.Response.WriteAsync(speakeasy);
                    return;
                case "/dialog-box.js":
Console.WriteLine($"{queryParams.ToString()}");
                    var borderStops = queryParams["borderStops"].ToString() ?? "";
                    var backgroundStops = queryParams["backgroundStops"].ToString() ?? "";
                    var width = queryParams["width"].ToString() ?? "";
                    var height = queryParams["height"].ToString() ?? "";
                    var borderRadius = queryParams["borderRadius"].ToString() ?? "";
                    var borderWidth = queryParams["borderWidth"].ToString() ?? "";
                    var dialog = await dialogBox.SVG("{{contents}}", _env, borderStops, backgroundStops, width, height, borderRadius, borderWidth);
                    await context.Response.WriteAsync(dialog);
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
