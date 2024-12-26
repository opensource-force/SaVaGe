using System;

internal class Drawings
{
    internal Drawings() 
    {
        
    }

    internal async Task<string> CloudSVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("drawings/cloud.svg");

        return wrapper.Replace("{{contents}}", svg);
    }
}
