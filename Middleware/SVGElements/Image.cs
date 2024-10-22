using System;

internal class Image
{
    internal Image() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string centerX, string centerY, string width, string height, string opacity, string imageURL, string animations) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("image.svg");
Console.WriteLine(svg);

        svg = svg.Replace("{{centerX}}", centerX)
            .Replace("{{centerY}}", centerY)
            .Replace("{{width}}", width)
            .Replace("{{height}}", height)
            .Replace("{{opacity}}", opacity)
            .Replace("{{imageURL}}", imageURL)
            .Replace("{{animations}}", animations);

        return wrapper.Replace("{{contents}}", svg);
    }
}
