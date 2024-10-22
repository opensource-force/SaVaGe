using System;

public class Text
{
    public Text() 
    {

    }

    // TODO: Per this comment: https://github.com/opensource-force/SaVaGe/pull/1/files#r1807554823, a builder
    // pattern would be better here, but I want to punt on that for now because a) I'm not sure how I want
    // to handle default and optional values, and b) I'm not sure if this stays as a single Text class, or grows
    // to an abstract class with descendants. 

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string textX, string textY, string fontWeight, string fontSize, string textColor, string fill, string textDecoration, string opacity, string text, string animations) 
    {
      // TODO: This comment https://github.com/opensource-force/SaVaGe/pull/1/files#r1807633368 brings up a good 
      // point that these primitive svg's can probably be strings here instead of read from wwwroot. I'm 
      // punting on this again because of the points above, and because for now I think it's useful to keep
      // all the svg in one place.

      string svg = await _env.ReadFileFromWebRootAsync("text.svg");

      svg = svg.Replace("{{textX}}", textX)
          .Replace("{{textY}}", textY)
          .Replace("{{fontWeight}}", fontWeight)
          .Replace("{{fontSize}}", fontSize)
          .Replace("{{textColor}}", textColor)
          .Replace("{{fill}}", fill)
          .Replace("{{textDecoration}}", textDecoration)
          .Replace("{{opacity}}", opacity)
          .Replace("{{text}}", text)
          .Replace("{{animations}}", animations);

      return wrapper.Replace("{{contents}}", svg);
    }
}
