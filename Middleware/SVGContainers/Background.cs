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

    public async Task<string> StarfieldSVG(string wrapper, IWebHostEnvironment _env, IQueryCollection queryParams)
    {
        string js = await _env.ReadFileFromWebRootAsync("containers/backgrounds/background.js");
        string backgroundColor = queryParams["backgroundColor"].ToString() ?? "#221100";
Console.WriteLine(backgroundColor);

        var starfield = new Starfield();
        string svg = await starfield.SVG("{{contents}}", _env, "100%", "100%", backgroundColor, 200);
        js = js.Replace("{{contents}}", $"<svg width=\"100%\" height=\"100%\">\n{svg}\n</svg>");

        return wrapper.Replace("{{contents}}", js);
    }
}
