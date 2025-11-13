using System;

internal class AutoTextInput
{
    internal AutoTextInput() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string placeholder = "Type here...", string containerId = "", int initialWidth = 200) 
    {
        // Read the SVG template
        string svg = await _env.ReadFileFromWebRootAsync("ui/auto-text-input/auto-text-input.svg");
        
        // Generate unique ID for this instance
        var uniqueId = Guid.NewGuid().ToString("N").Substring(0, 8);
        
        // Replace placeholders in SVG
        svg = svg.Replace("{{id}}", uniqueId);
        svg = svg.Replace("{{width}}", initialWidth.ToString());
        svg = svg.Replace("{{placeholder}}", placeholder);
        
        // Read the JavaScript wrapper
        string js = await _env.ReadFileFromWebRootAsync("ui/auto-text-input/auto-text-input.js");
        
        // Replace placeholders in JS
        js = js.Replace("{{id}}", uniqueId);
        js = js.Replace("{{containerId}}", string.IsNullOrEmpty(containerId) ? "" : containerId);
        js = js.Replace("{{placeholder}}", placeholder);
        js = js.Replace("{{contents}}", svg);
        
        return js;
    }
}