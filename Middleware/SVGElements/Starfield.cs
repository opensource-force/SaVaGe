using System;

internal class Starfield
{
    internal Starfield() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string width, string height, string backgroundColor, int numberOfStars) 
    {
        var svg = await _env.ReadFileFromWebRootAsync("starfield.svg");
        var stars = "<g id=\"stars\">";
        string[] starColors = ["#fddede", "#defdde", "#dedefd", "#fdfdde", "#fddefd", "#defdfd"];
        for(int i = 0; i < numberOfStars; i++) 
        {
            var cx = RandomGenerator.GetRandomNumber(0, 100);
            var cy = RandomGenerator.GetRandomNumber(0, 100);
            var r = RandomGenerator.GetRandomNumber(1, 5);
            var fillColorIndex = RandomGenerator.GetRandomNumber(0, 5);
            var fillColor = starColors[fillColorIndex];

            stars = stars + $"<circle cx=\"{cx}%\" cy=\"{cy}%\" r=\"{r}\" fill=\"{fillColor}\"/>";
        }

        svg = svg.Replace("{{backgroundColor}}", backgroundColor);
        svg = svg.Replace("{{stars}}", stars);

        svg = svg + "\r\n</g>";

        return wrapper.Replace("{{contents}}", svg);
    }
}
