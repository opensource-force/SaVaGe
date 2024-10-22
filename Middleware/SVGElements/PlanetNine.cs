using System;

internal class PlanetNine
{
    internal PlanetNine() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string cx, string cy, string r) 
    {
        var svg = await _env.ReadFileFromWebRootAsync("planet-nine.svg");

        svg = svg.Replace("{{cx}}", cx)
            .Replace("{{cy}}", cy)
            .Replace("{{r}}", r)
            .Replace("{{cyText1}}", $"{int.Parse(cy) + 5}")
            .Replace("{{cyText2}}", $"{int.Parse(cy) + 35}");

        return wrapper.Replace("{{contents}}", svg);
    }
}
