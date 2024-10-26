using System;

internal class ButtonSVG
{
    internal ButtonSVG() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env) 
    {
        var svg = "";

        var js = await _env.ReadFileFromWebRootAsync("ui/button/button.js");
        js = js.Replace("{{buttonId}}", "foo");
        js = js.Replace("{{buttonOnClick}}", "console.log(\'boom!\');");

        var button = new Button();
        svg = await button.SVG(js, _env, "PUSH ME");

        return wrapper.Replace("{{contents}}", svg);
    }
}
