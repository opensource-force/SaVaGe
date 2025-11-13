using System.Collections.Generic;
using System.Linq;

namespace SaVaGe.Middleware.ComponentProcessors;

/// <summary>
/// Registry for component processors. Automatically discovers and registers all IComponentProcessor implementations.
/// </summary>
public class ComponentProcessorRegistry
{
    private readonly Dictionary<string, IComponentProcessor> _processors;

    public ComponentProcessorRegistry(IEnumerable<IComponentProcessor> processors)
    {
        _processors = processors.ToDictionary(
            p => p.ComponentPath.TrimStart('/').ToLowerInvariant(),
            p => p
        );
    }

    /// <summary>
    /// Get a registered processor for the given component path.
    /// Returns null if no processor is registered (component uses auto-mapping).
    /// </summary>
    public IComponentProcessor? GetProcessor(string componentPath)
    {
        var normalizedPath = componentPath.TrimStart('/').ToLowerInvariant();
        _processors.TryGetValue(normalizedPath, out var processor);
        return processor;
    }

    /// <summary>
    /// Get all registered component paths
    /// </summary>
    public IEnumerable<string> GetRegisteredPaths() => _processors.Keys;
}
