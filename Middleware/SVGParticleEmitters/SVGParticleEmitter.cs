using System;

internal class SVGParticleEmitter
{
    internal SVGParticleEmitter() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string emitter) 
    {
        var svg = "";
        var emitterJS = await _env.ReadFileFromWebRootAsync("effects/pes/svg-pes.js");
        var emitterJSON = await _env.ReadFileFromWebRootAsync($"effects/pes/json-emitters/{emitter}");

        svg = emitterJS.Replace("{{emitterConfig}}", emitterJSON);

        return wrapper.Replace("{{contents}}", svg);
    }
}
