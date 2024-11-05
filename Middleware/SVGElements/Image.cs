using System;

internal class Image
{
    internal Image() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string centerX, string centerY, string width, string height, string opacity, string imageURL, string animations) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("ui/image/image.svg");
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

    internal async Task<string> CircularSVG(string wrapper, IWebHostEnvironment _env, string centerX, string centerY, string width, string height, string opacity, string imageURL, string animations, string radius)
    {
        string clipPath = await _env.ReadFileFromWebRootAsync("containers/clip-paths/circular-clip-path.svg");
        clipPath = clipPath.Replace("{{cx}}", centerX);
        clipPath = clipPath.Replace("{{cy}}", centerY);
        clipPath = clipPath.Replace("{{r}}", radius);
        string svg = await SVG("{{contents}}", _env, centerX, centerY, width, height, opacity, imageURL, animations);

        svg = clipPath + svg;
      
        return wrapper.Replace("{{contents}}", svg);
    }
}
