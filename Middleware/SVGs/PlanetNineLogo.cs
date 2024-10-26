using System;

internal class PlanetNineLogo
{
    private readonly IWebHostEnvironment _env;
    private readonly Lazy<Task> _initializationTask;
    private string svg;
    private string originalSVG;

    internal PlanetNineLogo(IWebHostEnvironment env)  
    {
        _env = env;
        _initializationTask = new Lazy<Task>(() => DoInitializeAsync());
    }

    internal async Task InitializeAsync() 
    {
        await _initializationTask.Value;
    }

    internal async Task DoInitializeAsync() 
    {
        svg = await _env.ReadFileFromWebRootAsync("logos/planet-nine-logo/planet-nine-logo.svg"); 
        originalSVG = svg;
    }

    internal async Task<string> SVG() 
    {
         svg = originalSVG;

         var starfield = new Starfield();
         var starfieldSVG = await starfield.SVG("{{contents}}", _env, "100", "60", "#100a12", 62);

         var planetNine = new PlanetNine();
         var planetNineSVG = await planetNine.SVG("{{contents}}", _env, "35", "35", "30");

         var text = new Text();
         var textSVG = await text.SVG("{{contents}}", _env, "50%", "85%", "bold", "16", "#fefefe", "#fefefe", "none", "1", "A Planet Nine production", "");

         svg = svg + starfieldSVG + planetNineSVG + textSVG;

         return svg;
    }
}
