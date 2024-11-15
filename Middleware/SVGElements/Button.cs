using System;

internal class Button
{
    internal Button() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string buttonText) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("ui/button/button.svg");

        svg = svg.Replace("{{buttonText}}", buttonText);

        return wrapper.Replace("{{contents}}", svg);
    }

    internal async Task<string> GradientSVG(string wrapper, IWebHostEnvironment _env, IQueryCollection queryParams)
    {
        string svg = await _env.ReadFileFromWebRootAsync("ui/button/gradient-button.svg");
        string js = await _env.ReadFileFromWebRootAsync("ui/button/button.js");

        js = js.Replace("{{contents}}", svg);

        foreach (var (key, value) in queryParams)
        {
            js = js.Replace($"{{{{{key}}}}}", value);
        }

        return wrapper.Replace("{{contents}}", js);
    }
}
