using System;

public class Link
{
    public Link() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string link) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("link.svg");

        svg = svg.Replace("{{link}}", link);

        return wrapper.Replace("{{contents}}", svg);
    }
}
