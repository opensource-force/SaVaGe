using System;

internal class ParentContainer
{
    internal ParentContainer() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env) 
    {
        var svg = "";

        var js = await _env.ReadFileFromWebRootAsync("containers/parent.js");
        js = js.Replace("{{parentElement}}", "parent");

        var parent = new Parent();
        svg = await parent.SVG(js, _env, "100", "100", "blue");
        svg = svg.Replace("{{contents}}", "");

        return wrapper.Replace("{{contents}}", svg);
    }
}
