using System;

public class ButtonSVG
{
    public ButtonSVG() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = "";

        string js = await _env.ReadFileFromWebRootAsync("button.js");
        js = js.Replace("{{buttonId}}", "foo");
        js = js.Replace("{{buttonOnClick}}", "console.log(\'boom!\');");

        Button button = new Button();
        svg = await button.SVG(js, _env, "PUSH ME");

        return wrapper.Replace("{{contents}}", svg);
    }
}
