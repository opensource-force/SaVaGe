using System;
using System.Threading.Tasks;

internal class NeonGlowShowcase
{
    internal NeonGlowShowcase()
    {
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env)
    {
        var js = await _env.ReadFileFromWebRootAsync("showcase/neon-glow/neon-glow.js");
        var svg = await _env.ReadFileFromWebRootAsync("showcase/neon-glow/neon-glow.svg");

        js = js.Replace("{{contents}}", svg);

        return wrapper.Replace("{{contents}}", js);
    }
}
