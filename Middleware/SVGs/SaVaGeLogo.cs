using System;

public class SaVaGeLogo
{
    public SaVaGeLogo()  
    {
    
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = await _env.ReadFileFromWebRootAsync("savage-logo.svg");

        DateTime specificDate = new DateTime(2024, 10, 15); // Example: January 1, 2023
        DateTime today = DateTime.Today;
        TimeSpan difference = today - specificDate;
        
        int daysSince = (int)difference.TotalDays;

         string savageContents = $"This website is a single svg composed of smaller svgs using a framework called SaVaGe. If it looks a little janky it's because SaVaGe was made like {daysSince} days ago. But here's why it's cool. This website is {{svgSize}} KB whereas the average website is 2.5 MB. And this website has lightning 🙂";

         string str = savageContents;
         int chunkSize = 20;

         List<string> chunks = Enumerable.Range(0, str.Length / chunkSize)
            .Select(i => str.Substring(i * chunkSize, chunkSize))
            .Concat(new[] { str.Substring(str.Length - str.Length % chunkSize) })
            .Where(s => !string.IsNullOrEmpty(s))
            .ToList();

         string explainer = "";
         float baseY = 5.2F;
         float index = 1.2F;

         foreach (string chunk in chunks) 
         {
             explainer = explainer + $"<tspan x=\"50%\" y=\"{baseY + index}em\">{chunk}</tspan>";
             index = index + 1;
         }

         svg = svg.Replace("{{savageLogoText}}", explainer); 

         return wrapper.Replace("{{contents}}", svg);
    }

}
