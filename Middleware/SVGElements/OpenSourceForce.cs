using System;

internal class OpenSourceForce
{
    internal async Task<string> Text(IWebHostEnvironment env) 
    {
         var svg = await ReadFileFromWebRootAsync(env, "logos/osf-logo/open-source-force-text.svg");

         // Lots of things can be dynamic with this text, and here is where you can add that
         
         return svg;
    }

    // TODO: Move this to some shared utils file eventually

    internal async Task<string> ReadFileFromWebRootAsync(IWebHostEnvironment env, string fileName)
    {
        string filePath = Path.Combine(env.WebRootPath, fileName);
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"The file {fileName} was not found in wwwroot.");
        }
        return await File.ReadAllTextAsync(filePath);
    }

}
