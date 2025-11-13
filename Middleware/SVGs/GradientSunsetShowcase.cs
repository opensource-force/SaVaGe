using System;
using System.Threading.Tasks;

internal class GradientSunsetShowcase
{
    internal GradientSunsetShowcase()
    {
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env)
    {
        var js = await _env.ReadFileFromWebRootAsync("showcase/gradient-sunset/gradient-sunset.js");
        var svg = await _env.ReadFileFromWebRootAsync("showcase/gradient-sunset/gradient-sunset.svg");

        js = js.Replace("{{contents}}", svg);

        return wrapper.Replace("{{contents}}", js);
    }
}
