using System;

internal class GridContainer
{
    internal GridContainer() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string backgroundColor) 
    {
        string js = await _env.ReadFileFromWebRootAsync("containers/grid-container/grid-container.js");

        return wrapper.Replace("{{contents}}", js);
    }
}
