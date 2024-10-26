using System;

internal class Parent
{
    internal Parent() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string viewBoxWidth, string viewBoxHeight, string backgroundColor) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("containers/parent/parent.svg");

        svg = svg.Replace("{{viewBoxWidth}}", viewBoxWidth)
            .Replace("{{viewBoxHeight}}", viewBoxHeight)
            .Replace("{{backgroundColor}}", backgroundColor);

        return wrapper.Replace("{{contents}}", svg);
    }
}
