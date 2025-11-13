# SaVaGe Refactored - Quick Start Guide

## 🚀 Activate the New System (30 seconds)

```bash
cd /Users/zachbabb/Work/planet-nine/third-party/savage

# Backup and activate
mv Middleware/DynamicJavaScriptMiddleware.cs Middleware/DynamicJavaScriptMiddleware.Old.cs
mv Middleware/DynamicJavaScriptMiddleware.Refactored.cs Middleware/DynamicJavaScriptMiddleware.cs
cp Program.Refactored.cs Program.cs

# Run it
dotnet build
dotnet run
```

## ✅ Test It Works (1 minute)

```bash
# Simple auto-mapped component
curl "http://localhost:5000/ui/button.js?text=Click%20Me&color=blue"

# Complex processor component
curl "http://localhost:5000/containers/dialog-box.js?width=400&height=300&borderWidth=2"

# Particle emitter
curl "http://localhost:5000/svg-pes-MAGICFire.js?x=300&y=400"
```

If all three return JavaScript (not errors), **you're done!** 🎉

## 📝 Add Your First Component (2 minutes)

Let's create a simple card component with zero C# code:

### 1. Create the SVG template

```bash
mkdir -p wwwroot/ui/card
```

Create `wwwroot/ui/card/card.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
  <style>
    .card-bg { fill: {{backgroundColor}}; }
    .card-title { font-size: 24px; fill: {{textColor}}; font-weight: bold; }
    .card-body { font-size: 14px; fill: {{textColor}}; }
  </style>

  <rect class="card-bg" x="0" y="0" width="300" height="200" rx="10" />
  <text class="card-title" x="150" y="60" text-anchor="middle">{{title}}</text>
  <text class="card-body" x="150" y="100" text-anchor="middle">{{body}}</text>
</svg>
```

### 2. Create the JS wrapper

Create `wwwroot/ui/card/card.js`:
```javascript
(() => {
  const containerId = '{{containerId}}' || 'card-' + Date.now();
  const container = document.getElementById(containerId) || document.createElement('div');

  if (!container.id) {
    container.id = containerId;
    document.body.appendChild(container);
  }

  const svg = `{{contents}}`;
  container.innerHTML = svg;
})();
```

### 3. Use it!

```html
<!-- In your HTML -->
<div id="my-card"></div>
<script src="http://localhost:5000/ui/card.js?containerId=my-card&title=Hello&body=This%20is%20a%20card&backgroundColor=%23667eea&textColor=white"></script>
```

**That's it!** No C# code. No middleware edits. Just drop files and go.

## 🔧 Add a Component with Custom Logic (5 minutes)

Let's create a progress bar that calculates percentages:

### 1. Create templates

`wwwroot/ui/progress-bar/progress-bar.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {{width}} 40">
  <rect x="0" y="0" width="{{width}}" height="40" fill="#ddd" rx="20" />
  <rect x="0" y="0" width="{{fillWidth}}" height="40" fill="{{color}}" rx="20" />
  <text x="50%" y="25" text-anchor="middle" font-size="16">{{percentText}}</text>
</svg>
```

`wwwroot/ui/progress-bar/progress-bar.js`:
```javascript
(() => {
  const svg = `{{contents}}`;
  document.getElementById('{{containerId}}').innerHTML = svg;
})();
```

### 2. Create the processor

`Middleware/ComponentProcessors/ProgressBarProcessor.cs`:
```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace SaVaGe.Middleware.ComponentProcessors;

public class ProgressBarProcessor : IComponentProcessor
{
    public string ComponentPath => "ui/progress-bar";

    public async Task<Dictionary<string, string>> GetReplacements(
        HttpContext context,
        IWebHostEnvironment env)
    {
        var query = context.Request.Query;

        // Parse input
        var current = int.Parse(query["current"].ToString() ?? "0");
        var total = int.Parse(query["total"].ToString() ?? "100");
        var width = int.Parse(query["width"].ToString() ?? "300");
        var color = query["color"].ToString() ?? "#667eea";
        var containerId = query["containerId"].ToString() ?? "progress-bar";

        // Calculate percentage (THE LOGIC!)
        var percent = total > 0 ? (int)((current / (float)total) * 100) : 0;
        var fillWidth = (int)((percent / 100.0) * width);

        return new Dictionary<string, string>
        {
            { "width", width.ToString() },
            { "fillWidth", fillWidth.ToString() },
            { "color", color },
            { "percentText", $"{percent}%" },
            { "containerId", containerId }
        };
    }
}
```

### 3. Register the processor

Add to `Program.cs`:
```csharp
builder.Services.AddScoped<IComponentProcessor, ProgressBarProcessor>();
```

### 4. Use it!

```html
<div id="my-progress"></div>
<script src="http://localhost:5000/ui/progress-bar.js?current=75&total=100&width=400&color=%23667eea&containerId=my-progress"></script>
```

## 🎯 When to Use What

| Scenario | Solution | C# Needed? |
|----------|----------|------------|
| Simple SVG with text/colors | Pure template | ❌ No |
| Math/calculations needed | Add processor | ✅ Yes |
| Compose multiple SVGs | Add processor | ✅ Yes |
| Dynamic data from API | Add processor | ✅ Yes |
| Just template substitution | Pure template | ❌ No |

## 🐛 Common Issues

### "Template not found"
**Problem:** File structure doesn't match URL

**Fix:** For `/ui/card.js`, you need:
```
wwwroot/
  ui/
    card/
      card.svg  ← Name must match!
      card.js   ← Name must match!
```

### "Replacements not working"
**Problem:** Wrong mustache syntax

**Fix:**
- Server-side C#: `{{variable}}`
- Client-side JS: `{variable}`

### "Processor not called"
**Problem:** Forgot to register in Program.cs

**Fix:** Add this line:
```csharp
builder.Services.AddScoped<IComponentProcessor, YourProcessor>();
```

## 📚 Learn More

- **Full migration guide:** Read `MIGRATION.md`
- **Complete overview:** Read `REFACTORING-SUMMARY.md`
- **See examples:** Check `Middleware/ComponentProcessors/*.cs`

## 🎉 You're Ready!

The system is now:
- ✅ Auto-discovering components from file structure
- ✅ Auto-mapping query parameters
- ✅ Using processors only when needed
- ✅ Maintainable and testable

**Go build something awesome!** 🚀
