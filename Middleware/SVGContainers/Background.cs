using System;

internal class Background
{
    internal Background() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string backgroundColor) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("containers/backgrounds/background.svg");

        svg = svg.Replace("{{backgroundColor}}", backgroundColor);

        return wrapper.Replace("{{contents}}", svg);
    }

    internal async Task<string> GradientSVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("containers/backgrounds/background.svg");

        var linearGradient = new LinearGradient();
        svg = await linearGradient.SVG(svg, _env, "background", "0%", "0%", "100%", "0%", "0%", "100%", "purple", "green");

        return wrapper.Replace("{{contents}}", svg);
    }
}
