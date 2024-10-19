using System;

public class Threejs
{
    public Threejs() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("3js.svg");

        return wrapper.Replace("{{contents}}", svg);
    }
}
