using System;

public class Image
{
    public Image() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string centerX, string centerY, string width, string height, string opacity, string imageURL, string animations) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("image.svg");
Console.WriteLine(svg);

        svg = svg.Replace("{{centerX}}", centerX);
        svg = svg.Replace("{{centerY}}", centerY);
        svg = svg.Replace("{{width}}", width);
        svg = svg.Replace("{{height}}", height);
        svg = svg.Replace("{{opacity}}", opacity);
        svg = svg.Replace("{{imageURL}}", imageURL);
        svg = svg.Replace("{{animations}}", animations);

        return wrapper.Replace("{{contents}}", svg);
    }
}
