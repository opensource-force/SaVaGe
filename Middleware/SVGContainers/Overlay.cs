using System;

internal class Overlay
{
    internal Overlay() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string backgroundColor) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("containers/overlay.svg");

        svg = svg.Replace("{{backgroundColor}}", backgroundColor);

        return wrapper.Replace("{{contents}}", svg);
    }
}
