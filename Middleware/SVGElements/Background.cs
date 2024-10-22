using System;

internal class Background
{
    internal Background() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string backgroundColor) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("background.svg");

        svg = svg.Replace("{{backgroundColor}}", backgroundColor);

        return wrapper.Replace("{{contents}}", svg);
    }
}
