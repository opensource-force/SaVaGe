using System;

public class Shield
{
    public async Task<string> Text(IWebHostEnvironment env) 
    {
         string svg = await ReadFileFromWebRootAsync(env, "shield.svg");

         // Lots of things can be dynamic with this text, and here is where you can add that
         
         return svg;
    }

    // TODO: Move this to some shared utils file eventually

    public async Task<string> ReadFileFromWebRootAsync(IWebHostEnvironment env, string fileName)
    {
        string filePath = Path.Combine(env.WebRootPath, fileName);
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"The file {fileName} was not found in wwwroot.");
        }
        return await File.ReadAllTextAsync(filePath);
    }

}
