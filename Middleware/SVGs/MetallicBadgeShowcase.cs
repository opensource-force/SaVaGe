using System;
using System.Threading.Tasks;

internal class MetallicBadgeShowcase
{
    internal MetallicBadgeShowcase()
    {
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env)
    {
        var js = await _env.ReadFileFromWebRootAsync("showcase/metallic-badge/metallic-badge.js");
        var svg = await _env.ReadFileFromWebRootAsync("showcase/metallic-badge/metallic-badge.svg");

        js = js.Replace("{{contents}}", svg);

        return wrapper.Replace("{{contents}}", js);
    }
}
