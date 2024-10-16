using System;

public class Text
{
    public Text() 
    {

    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string textX, string textY, string fontWeight, string fontSize, string textColor, string textDecoration, string opacity, string text, string animations) 
    {
      string svg = await _env.ReadFileFromWebRootAsync("text.svg");

      svg = svg.Replace("{{textX}}", textX);
      svg = svg.Replace("{{textY}}", textY);
      svg = svg.Replace("{{fontWeight}}", fontWeight);
      svg = svg.Replace("{{fontSize}}", fontSize);
      svg = svg.Replace("{{textColor}}", textColor);
      svg = svg.Replace("{{textDecoration}}", textDecoration);
      svg = svg.Replace("{{opacity}}", opacity);
      svg = svg.Replace("{{text}}", text);
      svg = svg.Replace("{{animations}}", animations);

      return wrapper.Replace("{{contents}}", svg);
    }
}
