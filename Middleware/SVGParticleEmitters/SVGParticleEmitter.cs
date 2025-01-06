using System;

internal class SVGParticleEmitter
{
    internal SVGParticleEmitter() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string emitter, string screenPositionX, string screenPositionY) 
    {
        var svg = "";
        var emitterJS = await _env.ReadFileFromWebRootAsync("effects/pes/svg-pes.js");
        var emitterJSON = await _env.ReadFileFromWebRootAsync($"effects/pes/json-emitters/{emitter}");

        emitterJS = emitterJS.Replace("{{screenPositionX}}", screenPositionX);
        emitterJS = emitterJS.Replace("{{screenPositionY}}", screenPositionY);

        svg = emitterJS.Replace("{{emitterConfig}}", emitterJSON);

        return wrapper.Replace("{{contents}}", svg);
    }
}
