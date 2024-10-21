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
        string canvasWidth = "100%";
        string canvasHeight = "100%";

        string js = await _env.ReadFileFromWebRootAsync("canvas-test.js");
        js = js.Replace("{{canvasId}}", canvasId);
        js = js.Replace("{{canvasWidth}}", canvasWidth);
        js = js.Replace("{{canvasHeight}}", canvasHeight);

        Canvas canvas = new Canvas();
        svg = await canvas.SVG(js, _env, "0", "0", "200", "200", canvasId, canvasWidth, canvasHeight);

        return wrapper.Replace("{{contents}}", svg);
    }
 
    public async Task<string> PESSVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = "";
        string canvasId = "pesCanvas";
        string canvasWidth = "500";
        string canvasHeight = "500";

        string js = await _env.ReadFileFromWebRootAsync("canvas-pes-test.js");
        js = js.Replace("{{canvasId}}", canvasId);
        js = js.Replace("{{canvasWidth}}", "'" + canvasWidth + "'");
        js = js.Replace("{{canvasHeight}}", "'" + canvasHeight + "'");

        Canvas canvas = new Canvas();
        Background background = new Background();
        
        svg = await background.SVG("{{contents}}", _env, "#00d200");
        svg = await canvas.SVG(svg, _env, "0", "0", "100%", "100%", canvasId, canvasWidth, canvasHeight);
        svg = js.Replace("{{contents}}", svg);

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

    public async Task<string> ThreeDModelSVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = "";
        
        string threejs = await _env.ReadFileFromWebRootAsync("3.js");
        string gltfloader = await _env.ReadFileFromWebRootAsync("gltfloader.js");
        string js = await _env.ReadFileFromWebRootAsync("3dmodel.js");

//        string fulljs = threejs + "\r\n" + gltfloader + "\r\n" + js;
        string fulljs = js;

        Threejs threejsSVG = new Threejs();
        fulljs = await threejsSVG.SVG(fulljs, _env);

        return wrapper.Replace("{{contents}}", fulljs);
    }
}
