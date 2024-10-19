using System;

public class Canvas
{
    public Canvas() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string objectX, string objectY, string objectWidth, string objectHeight, string canvasId, string canvasWidth, string canvasHeight) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("canvas.svg");

        svg = svg.Replace("{{objectX}}", objectX);
        svg = svg.Replace("{{objectY}}", objectY);
        svg = svg.Replace("{{objectWidth}}", objectWidth);
        svg = svg.Replace("{{objectHeight}}", objectHeight);
        svg = svg.Replace("{{canvasId}}", canvasId);
        svg = svg.Replace("{{canvasWidth}}", canvasWidth);
        svg = svg.Replace("{{canvasHeight}}", canvasHeight);

        return wrapper.Replace("{{contents}}", svg);
    }
}
