using System;

internal class PlanetNineMonitor
{
    internal PlanetNineMonitor() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string containerId, string width, string height, string cx, string cy, string r) 
    {
        string js = await _env.ReadFileFromWebRootAsync("planet's-test-dir/planet-nine-monitor.js");
        string svg = await _env.ReadFileFromWebRootAsync("logos/planet-nine-logo/planet-nine.svg");

        svg = svg.Replace("{{cx}}", cx);
        svg = svg.Replace("{{cy}}", cy);
        svg = svg.Replace("{{r}}", r);
        svg = svg.Replace("{{width}}", "100%");
        svg = svg.Replace("{{height}}", "100%");

        js = js.Replace("{{containerId}}", containerId);
        js = js.Replace("{{width}}", width);
        js = js.Replace("{{height}}", height);
        
        js = js.Replace("{{contents}}", svg);

        return wrapper.Replace("{{contents}}", js);
    }
}
