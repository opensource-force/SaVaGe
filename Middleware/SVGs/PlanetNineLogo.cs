using System;

public class PlanetNineLogo
{
    private readonly IWebHostEnvironment _env;
    private readonly Lazy<Task> _initializationTask;
    private string svg;
    private string originalSVG;

    public PlanetNineLogo(IWebHostEnvironment env)  
    {
        _env = env;
        _initializationTask = new Lazy<Task>(() => DoInitializeAsync());
    }

    public async Task InitializeAsync() 
    {
        await _initializationTask.Value;
    }

    public async Task DoInitializeAsync() 
    {
        svg = await ReadFileFromWebRootAsync(_env, "planet-nine-logo.svg"); 
        originalSVG = svg;
    }

    public async Task<string> SVG() 
    {
         svg = originalSVG;

         Starfield starfield = new Starfield();
         string starfieldSVG = await starfield.SVG("{{contents}}", _env, "100", "60", "#100a12", 62);

         PlanetNine planetNine = new PlanetNine();
         string planetNineSVG = await planetNine.SVG("{{contents}}", _env, "35", "35", "30");

         Text text = new Text();
         string textSVG = await text.SVG("{{contents}}", _env, "50%", "85%", "bold", "16", "#fefefe", "#fefefe", "none", "1", "A Planet Nine production", "");

         svg = svg + starfieldSVG + planetNineSVG + textSVG;

         return svg;
    }

    // TODO: Move this to some shared utils file eventually

    public async Task<string> ReadFileFromWebRootAsync(IWebHostEnvironment env, string fileName)
    {
         string filePath = Path.Combine(env.WebRootPath, fileName);
         if (!File.Exists(filePath))
         {
             throw new FileNotFoundException($"The file {fileName} was not found in wwwroot.");
         }
         string file = await File.ReadAllTextAsync(filePath);
         return file;
    }

}
