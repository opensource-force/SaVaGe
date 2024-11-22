using System;

internal class DialogBox
{
    internal DialogBox() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string borderStops, string backgroundStops, string width, string height, string borderRadius, string borderWidth) 
    {
Console.WriteLine($"{width}, {borderWidth}");
        int border = int.Parse(borderWidth);
        int twiceBorder = border * 2;
        int widthMinusBorder = int.Parse(width) - twiceBorder;
        int heightMinusBorder = int.Parse(height) - twiceBorder;
        int borderRadiusMinusBorder = int.Parse(borderRadius) - border;

        string svg = await _env.ReadFileFromWebRootAsync("containers/dialog-box/dialog-box.svg");

        svg = svg.Replace("{{borderStops}}", borderStops);
        svg = svg.Replace("{{backgroundStops}}", backgroundStops);
        svg = svg.Replace("{{width}}", "100%");
        svg = svg.Replace("{{height}}", "100%");
        svg = svg.Replace("{{borderRadius}}", borderRadius);
        svg = svg.Replace("{{borderWidth}}", borderWidth);
        svg = svg.Replace("{{widthMinusBorder}}", $"{widthMinusBorder}");
        svg = svg.Replace("{{heightMinusBorder}}", $"{heightMinusBorder}");
        svg = svg.Replace("{{borderRadiusMinusBorder}}", $"{borderRadiusMinusBorder}");

        string js = await _env.ReadFileFromWebRootAsync("containers/dialog-box/dialog-box.js");

        js = js.Replace("{{containerId}}", "foobar"); // TODO: should this be random or passed in?
        js = js.Replace("{{width}}", width);
        js = js.Replace("{{height}}", height);
        
        js = js.Replace("{{contents}}", svg);

        return wrapper.Replace("{{contents}}", js);
    }
}
