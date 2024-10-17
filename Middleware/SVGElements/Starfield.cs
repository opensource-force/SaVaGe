using System;

public class Starfield
{
    public Starfield() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string width, string height, string backgroundColor, int numberOfStars) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("starfield.svg");
        string stars = "<g id=\"stars\">";
        string[] starColors = ["#fddede", "#defdde", "#dedefd", "#fdfdde", "#fddefd", "#defdfd"];
        for(int i = 0; i < numberOfStars; i++) 
        {
            int cx = RandomGenerator.GetRandomNumber(0, 100);
            int cy = RandomGenerator.GetRandomNumber(0, 100);
            int r = RandomGenerator.GetRandomNumber(1, 5);
            int fillColorIndex = RandomGenerator.GetRandomNumber(0, 5);
            string fillColor = starColors[fillColorIndex];

            stars = stars + $"<circle cx=\"{cx}%\" cy=\"{cy}%\" r=\"{r}\" fill=\"{fillColor}\"/>";
        }

        svg = svg.Replace("{{backgroundColor}}", backgroundColor);
        svg = svg.Replace("{{stars}}", stars);

        svg = svg + "\r\n</g>";

        return wrapper.Replace("{{contents}}", svg);
    }
}
