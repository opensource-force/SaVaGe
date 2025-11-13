using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace SaVaGe.Middleware.ComponentProcessors;

/// <summary>
/// Interface for custom component processors that need C# logic beyond simple template substitution.
/// Components without a registered processor will automatically use query parameters for template replacement.
/// </summary>
public interface IComponentProcessor
{
    /// <summary>
    /// The component path this processor handles (e.g., "ui/dialog-box" for /ui/dialog-box.js)
    /// </summary>
    string ComponentPath { get; }

    /// <summary>
    /// Generate the mustache template replacements for this component.
    /// Return a dictionary where keys are mustache placeholders (without braces) and values are the replacements.
    /// </summary>
    /// <param name="context">HTTP request context containing query parameters, headers, etc.</param>
    /// <param name="env">Web host environment for accessing wwwroot files</param>
    /// <returns>Dictionary of template replacements</returns>
    Task<Dictionary<string, string>> GetReplacements(HttpContext context, IWebHostEnvironment env);
}
