using System;

public class PlanetNine
{
    public PlanetNine() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string cx, string cy, string r) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("planet-nine.svg");

        svg = svg.Replace("{{cx}}", cx);
        svg = svg.Replace("{{cy}}", cy);
        svg = svg.Replace("{{r}}", r);
        svg = svg.Replace("{{cyText1}}", $"{int.Parse(cy) + 5}");
        svg = svg.Replace("{{cyText2}}", $"{int.Parse(cy) + 35}");

        return wrapper.Replace("{{contents}}", svg);
    }
}
