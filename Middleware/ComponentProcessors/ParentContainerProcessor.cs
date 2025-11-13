using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using SaVaGe.Middleware.ComponentProcessors;

namespace SaVaGe.Middleware.ComponentProcessors;

/// <summary>
/// Processor for parent-container component.
/// Handles parentElementId and decoration parameters.
/// </summary>
public class ParentContainerProcessor : IComponentProcessor
{
    public string ComponentPath => "containers/parent";

    public async Task<Dictionary<string, string>> GetReplacements(HttpContext context, IWebHostEnvironment env)
    {
        var query = context.Request.Query;

        var parentElementId = query["parentElementId"].ToString() ?? "parent";
        var decoration = query["decoration"].ToString() ?? "";

        return new Dictionary<string, string>
        {
            { "parentElementId", parentElementId },
            { "decoration", decoration }
        };
    }
}
