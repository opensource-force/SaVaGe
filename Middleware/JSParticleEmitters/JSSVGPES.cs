using System;

internal class JSSVGPES
{
    internal JSSVGPES() 
    {
        
    }

    internal async Task<string> JS(string wrapper, IWebHostEnvironment _env) 
    {
        var emitterJS = await _env.ReadFileFromWebRootAsync("effects/pes/svg-pes.js");

        svg = emitterJS.Replace("{{emitterConfig}}", emitterJSON);

        return wrapper.Replace("{{contents}}", svg);
    }

    internal async Task<string> DeployEmitter(string wrapper, IWebHostEnvironment _env, string emitter, string screenPositionX, string screenPositionY)
    {
        var deployEmitter = await _env.ReadFileFromWebRootAsync($"effects/pes/deploy-emitter.js");
        var emitterJSON = await _env.ReadFileFromWebRootAsync($"effects/pes/json-emitters/{emitter}");

        emitterJSON = emitterJSON.insert(emitterJSON.Length - 2, $",\"screendPositionX\":\"{screenPositionX}\",\"screenPositionY\":\"{screenPositionY}\"");

        return wrapper.Replace("{{additionalJS}}", emitterJSON);
    }
}
