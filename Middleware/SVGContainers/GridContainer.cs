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

    internal async Task<string> EllipsoidalSVG(string wrapper, IWebHostEnvironment _env, string containerId, string cx, string cy, string rx, string ry, string ellipseClipStroke)
    {
        string js = await _env.ReadFileFromWebRootAsync("containers/grid-container/grid-container.js");

        string ellipseClip = await _env.ReadFileFromWebRootAsync("containers/clip-paths/ellipsoidal-clip-path.svg");

        ellipseClip = ellipseClip.Replace("{{cx}}", cx);
        ellipseClip = ellipseClip.Replace("{{cy}}", cy);
        ellipseClip = ellipseClip.Replace("{{rx}}", rx);
        ellipseClip = ellipseClip.Replace("{{ry}}", ry);
        ellipseClip = ellipseClip.Replace("{{ellipseClipStroke}}", ellipseClipStroke);
        
        js = js.Replace("{{containerId}}", containerId);
        js = js.Replace("{{contents}}", ellipseClip);

        return wrapper.Replace("{{contents}}", js);
    }
}
