using System;

public class Opacity
{
    public Opacity() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string values, string begin, string duration, string end) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("animations/opacity.svg");

        svg = svg.Replace("{{values}}", values);
        svg = svg.Replace("{{begin}}", begin);
        svg = svg.Replace("{{duration}}", duration);
        svg = svg.Replace("{{fill}}", end);

        return wrapper.Replace("{{contents}}", svg);
    }
}
