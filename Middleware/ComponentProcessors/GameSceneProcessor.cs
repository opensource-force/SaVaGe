using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using SaVaGe.Middleware.ComponentProcessors;

namespace SaVaGe.Middleware.ComponentProcessors;

/// <summary>
/// Processor for game-scene component.
/// Handles adStrings array and decoration parameter.
/// </summary>
public class GameSceneProcessor : IComponentProcessor
{
    public string ComponentPath => "game-scene";

    public async Task<Dictionary<string, string>> GetReplacements(HttpContext context, IWebHostEnvironment env)
    {
        var query = context.Request.Query;

        var decoration = query["decoration"].ToString() ?? "";
        var adStrings = query["adStrings"].ToString()
            ?? "['ads_', 'ad-', 'ads-', 'googlesyndication', 'pagead2', 'fixed-ad']";

        return new Dictionary<string, string>
        {
            { "decoration", decoration },
            { "adStrings", adStrings }
        };
    }
}
