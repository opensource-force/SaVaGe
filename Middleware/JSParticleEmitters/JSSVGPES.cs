using System;

internal class JSSVGPES
{
    internal JSSVGPES() 
    {
        
    }

    internal async Task<string> JS(string wrapper, IWebHostEnvironment _env) 
    {
        var emitterJS = await _env.ReadFileFromWebRootAsync("effects/pes/svg-pes.js");

        return wrapper.Replace("{{additionalJS}}", emitterJS);
    }

    internal async Task<string> DeployEmitter(string wrapper, IWebHostEnvironment _env, string emitter, string screenPositionX, string screenPositionY, string delay)
    {
        var deployEmitter = await _env.ReadFileFromWebRootAsync($"effects/pes/deploy-emitter.js");
        var emitterJSON = await _env.ReadFileFromWebRootAsync($"effects/pes/json-emitters/{emitter}");

        emitterJSON = emitterJSON.Insert(emitterJSON.Length - 2, $",\"screendPositionX\":\"{screenPositionX}\",\"screenPositionY\":\"{screenPositionY}\"");

        deployEmitter = deployEmitter.Replace("{{emitter}}", emitterJSON);
        deployEmitter = deployEmitter.Replace("{{delay}}", delay);

        return wrapper.Replace("{{additionalJS}}", deployEmitter);
    }
}
