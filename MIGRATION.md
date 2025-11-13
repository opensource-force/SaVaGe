# SaVaGe Refactoring Migration Guide

This document outlines the migration from the old switch-statement-based middleware to the new convention-based routing system.

## What Changed

### Before (Old System)
- Every component required editing `DynamicJavaScriptMiddleware.cs`
- Manual switch statement with hardcoded paths
- Custom C# classes for every component (Button.cs, ButtonSVG.cs, etc.)
- No clear separation between simple and complex components

### After (New System)
- Components auto-discovered from `wwwroot` file structure
- Query parameters automatically map to mustache templates
- Custom processors **only needed** for components with C# logic
- Clean, maintainable, testable architecture

## Component Migration Status

### ✅ Auto-Mapping (No Processor Needed)

These components work with **zero C# code** - just template files:

| Component | Path | Templates | Query Params |
|-----------|------|-----------|--------------|
| Button | `/ui/button.js` | button.js, button.svg | `text`, `color` |
| Link | `/ui/link.js` | link.svg | `href`, `target` |
| Text | `/ui/text.js` | text.svg | Various text styling params |
| Image | `/ui/image.js` | image.svg | `src`, `width`, `height`, etc. |
| AutoTextInput | `/ui/auto-text-input.js` | auto-text-input.js, auto-text-input.svg | Form field params |

**Migration:** Delete the C# classes, keep the template files. Done!

### 🔧 Custom Processors (C# Logic Required)

These components need processors for calculations, composition, or special logic:

| Component | Processor | Reason |
|-----------|-----------|--------|
| DialogBox | `DialogBoxProcessor.cs` | Integer math: width - (border * 2) |
| ParentContainer | `ParentContainerProcessor.cs` | Decoration parameter handling |
| GameScene | `GameSceneProcessor.cs` | AdStrings array construction |
| SVGParticleEmitter | `SVGParticleEmitterProcessor.cs` | JSON config loading |

**Migration:** Create processor class, delete old component class.

### 🎨 Complex Compositions (Special Handling)

These are complete webpages that compose many components:

| Component | Status | Notes |
|-----------|--------|-------|
| TheAdvancement | Needs webpage processor | Composes logos, backgrounds, links |
| MAGICAndTeleportation | Needs webpage processor | Composes animations, particle emitters |
| Juliaswitch | Needs webpage processor | Composes text, images, links |

**Migration:** Create high-level processors or consider breaking into smaller composable pieces.

## File Structure Changes

### Old Structure
```
/Middleware/
├── DynamicJavaScriptMiddleware.cs  // 200+ lines, giant switch
├── SVGElements/
│   ├── Button.cs                   // Loads template, does replacement
│   └── Text.cs                     // Loads template, does replacement
├── SVGs/
│   ├── ButtonSVG.cs                // Wraps Button.cs, more boilerplate
│   └── ...
└── ...
```

### New Structure
```
/Middleware/
├── DynamicJavaScriptMiddleware.Refactored.cs  // Clean, generic
├── ComponentProcessors/
│   ├── IComponentProcessor.cs                 // Interface
│   ├── ComponentProcessorRegistry.cs          // Auto-registration
│   ├── DialogBoxProcessor.cs                  // Only complex logic
│   └── GameSceneProcessor.cs                  // Only complex logic
└── [DELETE old SVGElements/ and SVGs/ folders]

/wwwroot/
└── [No changes - same template structure]
```

## Migration Steps

### Step 1: Update Program.cs

```csharp
using SaVaGe.Middleware.ComponentProcessors;

var builder = WebApplication.CreateBuilder(args);

// Register all component processors
builder.Services.AddScoped<IComponentProcessor, DialogBoxProcessor>();
builder.Services.AddScoped<IComponentProcessor, ParentContainerProcessor>();
builder.Services.AddScoped<IComponentProcessor, GameSceneProcessor>();
// Add more processors as needed

// Register the processor registry
builder.Services.AddScoped<ComponentProcessorRegistry>();

var app = builder.Build();

// Use the refactored middleware
app.UseDynamicJavaScript();

app.Run();
```

### Step 2: Migrate Simple Components

For components like Button that only do template substitution:

**Delete:**
- `/Middleware/SVGElements/Button.cs`
- `/Middleware/SVGs/ButtonSVG.cs`

**Keep:**
- `/wwwroot/ui/button/button.svg`
- `/wwwroot/ui/button/button.js`

**Test:**
```bash
# Should work exactly the same
curl "http://localhost:5000/ui/button.js?text=Click%20Me&color=blue"
```

### Step 3: Migrate Complex Components

For components like DialogBox that need C# logic:

**Create:** `/Middleware/ComponentProcessors/DialogBoxProcessor.cs`
```csharp
public class DialogBoxProcessor : IComponentProcessor
{
    public string ComponentPath => "containers/dialog-box";

    public async Task<Dictionary<string, string>> GetReplacements(
        HttpContext context,
        IWebHostEnvironment env)
    {
        // Your custom logic here
        var width = int.Parse(context.Request.Query["width"]);
        var border = int.Parse(context.Request.Query["borderWidth"]);

        return new Dictionary<string, string> {
            { "widthMinusBorder", (width - border * 2).ToString() }
        };
    }
}
```

**Delete:**
- `/Middleware/SVGContainers/DialogBox.cs`

**Register:** Add to Program.cs:
```csharp
builder.Services.AddScoped<IComponentProcessor, DialogBoxProcessor>();
```

### Step 4: Test Everything

```bash
# Test auto-mapped component
curl "http://localhost:5000/ui/button.js?text=Hello"

# Test processor component
curl "http://localhost:5000/containers/dialog-box.js?width=400&height=300&borderWidth=2"

# Test particle emitter
curl "http://localhost:5000/svg-pes-MAGICFire.js?x=300&y=400"
```

## Benefits of New System

### ✨ Add New Component (Simple)
**Before:** Create Button.cs (20 lines), create ButtonSVG.cs (25 lines), edit DynamicJavaScriptMiddleware.cs (5 lines) = **50+ lines**

**After:** Create button.svg, create button.js = **0 C# lines!**

### 🔧 Add New Component (Complex)
**Before:** Same as above, plus custom logic scattered across files

**After:** Create templates + create one focused processor class

### 🐛 Debug Component
**Before:** Track through ButtonSVG → Button → Middleware → Template files

**After:** Processor (if any) → Template files

### 🧪 Test Component
**Before:** Mock multiple classes, complex dependency chains

**After:** Mock IComponentProcessor interface, test in isolation

## Rollback Plan

If issues arise:

1. Rename `DynamicJavaScriptMiddleware.cs` → `DynamicJavaScriptMiddleware.Old.cs`
2. Rename `DynamicJavaScriptMiddleware.Refactored.cs` → `DynamicJavaScriptMiddleware.cs`
3. Restore old component classes from git
4. Update Program.cs to remove processor registration

## Next Steps

1. ✅ Create processor interface and registry
2. ✅ Create refactored middleware
3. ✅ Create example processors (DialogBox, ParentContainer, GameScene)
4. ⏳ Update Program.cs
5. ⏳ Test with existing endpoints
6. ⏳ Migrate all components
7. ⏳ Delete old middleware and component classes
8. ⏳ Update documentation

## Questions?

- **Q: What if my component needs to compose other components?**
  - A: Use a processor to load and combine multiple templates programmatically

- **Q: Can I mix old and new middleware?**
  - A: No - choose one. The new system handles all cases.

- **Q: What about backwards compatibility?**
  - A: URLs stay exactly the same. Clients see no difference.

- **Q: How do I add custom JavaScript?**
  - A: Return `{{additionalJS}}` from processor, replace in template
