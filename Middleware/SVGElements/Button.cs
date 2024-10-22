using System;

internal class Button
{
    internal Button() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string buttonText) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("button.svg");

        svg = svg.Replace("{{buttonText}}", buttonText);

        return wrapper.Replace("{{contents}}", svg);
    }
}
