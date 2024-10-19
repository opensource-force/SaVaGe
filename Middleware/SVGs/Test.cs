using System;

public class Test
{
    public Test() 
    {
        
    }

    public async Task<string> CanvasSVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = "";
        string canvasId = "savageCanvas";
        string canvasWidth = "60";
        string canvasHeight = "100";

        string js = await _env.ReadFileFromWebRootAsync("canvas-test.js");
        js = js.Replace("{{canvasId}}", canvasId);
        js = js.Replace("{{canvasWidth}}", canvasWidth);
        js = js.Replace("{{canvasHeight}}", canvasHeight);

        Canvas canvas = new Canvas();
        svg = await canvas.SVG(js, _env, "0", "10", "70", "200", canvasId, canvasWidth, canvasHeight);

        return wrapper.Replace("{{contents}}", svg);
    }
 
    public async Task<string> PESSVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = "";
        string canvasId = "pesCanvas";
        string canvasWidth = "60";
        string canvasHeight = "100";

        string js = await _env.ReadFileFromWebRootAsync("canvas-pes-test.js");
        js = js.Replace("{{canvasId}}", canvasId);
        js = js.Replace("{{canvasWidth}}", canvasWidth);
        js = js.Replace("{{canvasHeight}}", canvasHeight);

        Canvas canvas = new Canvas();
        svg = await canvas.SVG(js, _env, "0", "10", "70", "200", canvasId, canvasWidth, canvasHeight);

        return wrapper.Replace("{{contents}}", svg);
    }

    public async Task<string> ThreejsSVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = "";
        
        string threejs = await _env.ReadFileFromWebRootAsync("3.js");
        string js = await _env.ReadFileFromWebRootAsync("3js-test.js");

        string fulljs = threejs + "\r\n" + js;

        Threejs threejsSVG = new Threejs();
        fulljs = await threejsSVG.SVG(fulljs, _env);

        return wrapper.Replace("{{contents}}", fulljs);
    }
}
