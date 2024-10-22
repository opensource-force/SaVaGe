using System;

internal class SaVaGeLogo
{
    internal SaVaGeLogo()  
    {
    
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env) 
    {
        var svg = await _env.ReadFileFromWebRootAsync("savage-logo.svg");

        var specificDate = new DateTime(2024, 10, 15); // Example: January 1, 2023
        var today = DateTime.Today;
        var difference = today - specificDate;
        
        var daysSince = (int)difference.TotalDays;

        var savageContents = $"This website is a single svg composed of smaller svgs using a framework called SaVaGe. If it looks a little janky it's because SaVaGe was made like {daysSince} days ago. But here's why it's cool. This website is {{svgSize}} KB whereas the average website is 2.5 MB. And this website has lightning 🙂";

        var str = savageContents;
        var chunkSize = 20;

        List<string> chunks = Enumerable.Range(0, str.Length / chunkSize)
            .Select(i => str.Substring(i * chunkSize, chunkSize))
            .Concat(new[] { str.Substring(str.Length - str.Length % chunkSize) })
            .Where(s => !string.IsNullOrEmpty(s))
            .ToList();

        var explainer = "";
        var baseY = 5.2F;
        var index = 1.2F;

        foreach (string chunk in chunks) 
        {
             explainer = explainer + $"<tspan x=\"50%\" y=\"{baseY + index}em\">{chunk}</tspan>";
             index = index + 1;
        }

        svg = svg.Replace("{{savageLogoText}}", explainer); 

        return wrapper.Replace("{{contents}}", svg);
    }

}
