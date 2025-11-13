using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using SaVaGe.Middleware.ComponentProcessors;

namespace SaVaGe.Middleware.ComponentProcessors;

/// <summary>
/// Processor for dialog-box component that calculates dimensions based on border width.
/// Handles the math that can't be done in templates: width - (border * 2), etc.
/// </summary>
public class DialogBoxProcessor : IComponentProcessor
{
    public string ComponentPath => "containers/dialog-box";

    public async Task<Dictionary<string, string>> GetReplacements(HttpContext context, IWebHostEnvironment env)
    {
        var query = context.Request.Query;

        // Extract query parameters
        var borderStops = query["borderStops"].ToString() ?? "purple,pink";
        var backgroundStops = query["backgroundStops"].ToString() ?? "rgba(0,0,0,0.8),rgba(0,0,0,0.9)";
        var width = query["width"].ToString() ?? "400";
        var height = query["height"].ToString() ?? "300";
        var borderRadius = query["borderRadius"].ToString() ?? "12";
        var borderWidth = query["borderWidth"].ToString() ?? "2";
        var containerId = query["containerId"].ToString() ?? "dialog-" + Guid.NewGuid().ToString("N").Substring(0, 8);

        // Parse integers for calculations
        int border = int.Parse(borderWidth);
        int twiceBorder = border * 2;
        int widthMinusBorder = int.Parse(width) - twiceBorder;
        int heightMinusBorder = int.Parse(height) - twiceBorder;
        int borderRadiusMinusBorder = int.Parse(borderRadius) - border;

        return new Dictionary<string, string>
        {
            { "borderStops", borderStops },
            { "backgroundStops", backgroundStops },
            { "width", "100%" },  // Always 100% for responsiveness
            { "height", "100%" }, // Always 100% for responsiveness
            { "borderRadius", borderRadius },
            { "borderWidth", borderWidth },
            { "widthMinusBorder", widthMinusBorder.ToString() },
            { "heightMinusBorder", heightMinusBorder.ToString() },
            { "borderRadiusMinusBorder", borderRadiusMinusBorder.ToString() },
            { "containerId", containerId }
        };
    }
}
