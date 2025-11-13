using System;
using System.Threading.Tasks;

internal class GlassMorphismShowcase
{
    internal GlassMorphismShowcase()
    {
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env)
    {
        var js = await _env.ReadFileFromWebRootAsync("showcase/glass-morphism/glass-morphism.js");
        var svg = await _env.ReadFileFromWebRootAsync("showcase/glass-morphism/glass-morphism.svg");

        js = js.Replace("{{contents}}", svg);

        return wrapper.Replace("{{contents}}", js);
    }
}
