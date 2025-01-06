using System;

public class LinearGradient
{
    public LinearGradient() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string gradientId, string x1, string y1, string x2, string y2, string startOffset, string endOffset, string startColor, string endColor) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("effects/linear-gradient.svg");

        svg = svg.Replace("{{gradientId}}", gradientId);
        svg = svg.Replace("{{x1}}", x1);
        svg = svg.Replace("{{y1}}", y1);
        svg = svg.Replace("{{x2}}", x2);
        svg = svg.Replace("{{y2}}", y2);
        svg = svg.Replace("{{startOffset}}", startOffset);
        svg = svg.Replace("{{endOffset}}", endOffset);
        svg = svg.Replace("{{startColor}}", startColor);
        svg = svg.Replace("{{endColor}}", endColor);

        return wrapper.Replace("{{defs}}", svg);
    }
}
