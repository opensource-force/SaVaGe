using System;

public class Background
{
    public Background() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string backgroundColor) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("background.svg");

        svg = svg.Replace("{{backgroundColor}}", backgroundColor);

        return wrapper.Replace("{{contents}}", svg);
    }
}
