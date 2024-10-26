using System;

internal class Link
{
    internal Link() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string link) 
    {
        var svg = await _env.ReadFileFromWebRootAsync("ui/link/link.svg");

        svg = svg.Replace("{{link}}", link);

        return wrapper.Replace("{{contents}}", svg);
    }
}
