# Contentary Slides Quick-Start Guide

Contentary slides are 9:16 aspect ratio (1080x1920) SVG compositions that make visual commentary on modern tech culture, services, and digital life. This guide will help you create new slides quickly and easily.

## Overview

Each contentary slide is a split-screen composition:
- **Top Half** (0-960px): Usually represents the "before" or "worse" version
- **Divider** (950-970px): Separates the two halves
- **Bottom Half** (970-1920px): Usually represents the "after" or "better" (or more ridiculous) version

## Quick Start (5 Steps)

### 1. Copy the Template

```bash
cd wwwroot/contentary-slides/
cp _TEMPLATE.svg your-slide-name.svg
cp _TEMPLATE.js your-slide-name.js
```

**Naming Convention**: Use kebab-case (lowercase with hyphens)
- ✅ Good: `rent-a-chair-vs-spotiscription.svg`
- ✅ Good: `free-tier-vs-enterprise.svg`
- ❌ Bad: `MySlide.svg`
- ❌ Bad: `my_slide.svg`

### 2. Edit the SVG

Open `your-slide-name.svg` and customize:

```svg
<!-- Update the title comment -->
<!-- CONTENTARY SLIDE: your-slide-name -->
<!-- Description: What commentary is this making? -->

<!-- Customize the top half -->
<text x="540" y="250" ...>
  YOUR TOP TITLE
</text>

<!-- Customize the bottom half -->
<text x="540" y="1200" ...>
  YOUR BOTTOM TITLE
</text>

<!-- Add your content -->
```

### 3. Test Your Slide

Start the server:
```bash
dotnet run
```

View your slide at:
```
http://localhost:5000/contentary-your-slide-name.js
```

Or use the viewer:
```
http://localhost:5000/contentary-slide-viewer.html
```

Note: The URL pattern is `/contentary-[your-slide-name].js`

### 4. Add to Gallery

Edit `wwwroot/contentary-slides-gallery.html` and add your slide to the grid:

```html
<!-- Add this before the "Add New Card" -->
<div class="slide-card" data-slide="your-slide-name">
    <div class="slide-preview">
        <span class="placeholder-text">🎨</span>
    </div>
    <h2 class="slide-title">Your Slide Title</h2>
    <p class="slide-description">
        Description of what your slide is commenting on.
    </p>
    <a href="#" class="view-button">View Slide</a>
</div>
```

And add the URL mapping in the JavaScript:

```javascript
const slideUrls = {
    'rent-a-chair-vs-spotiscription': '/contentary-rent-a-chair-vs-spotiscription.js',
    'your-slide-name': '/contentary-your-slide-name.js'  // Add this line
};
```

### 5. View in Gallery

Navigate to:
```
http://localhost:5000/contentary-slides-gallery.html
```

## Design Tips

### Color Schemes

**Decrepit/Negative** (top half):
- Dark backgrounds: `#1a1a1a`, `#2c2c2c`
- Muted colors: `#6b5344`, `#4a3728`
- Low opacity elements

**Premium/Positive/Gaudy** (bottom half):
- Bright backgrounds: Purple (`#8b00ff`), Pink (`#ff00ff`)
- Gold gradients: `#ffd700`, `#ffed4e`
- High contrast, animated elements

### Common Elements

**Text:**
```svg
<text x="540" y="250"
      font-family="Impact, Arial Black"
      font-size="80"
      font-weight="bold"
      fill="#ffffff"
      text-anchor="middle">
  YOUR TEXT
</text>
```

**Gradient Text:**
```svg
<text ... fill="url(#yourGradient)" filter="url(#glow)">
  FANCY TEXT
</text>
```

**Icons/Shapes:**
```svg
<!-- Circle -->
<circle cx="540" cy="500" r="100" fill="#ff0000"/>

<!-- Rectangle -->
<rect x="200" y="300" width="680" height="200" rx="20" fill="#00ff00"/>

<!-- Star -->
<path d="M 0,-70 L 20,-20 L 70,-20 L 30,10 L 50,60 L 0,30 L -50,60 L -30,10 L -70,-20 L -20,-20 Z"
      fill="#ffff00"/>
```

**Animations:**
```svg
<!-- Blinking -->
<circle cx="100" cy="100" r="50" fill="red">
  <animate attributeName="opacity"
           values="1;0.3;1"
           dur="1.5s"
           repeatCount="indefinite"/>
</circle>

<!-- Rotating -->
<g transform="translate(540, 960)">
  <path d="..." fill="gold">
    <animateTransform attributeName="transform"
                      type="rotate"
                      from="0 540 960"
                      to="360 540 960"
                      dur="3s"
                      repeatCount="indefinite"/>
  </path>
</g>
```

### Effects Library

**Glow Effect:**
```svg
<defs>
  <filter id="glow">
    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>

<text ... filter="url(#glow)">GLOWING TEXT</text>
```

**Metallic Gradient:**
```svg
<linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" style="stop-color:#ffd700"/>
  <stop offset="25%" style="stop-color:#ffed4e"/>
  <stop offset="50%" style="stop-color:#ffd700"/>
  <stop offset="75%" style="stop-color:#ffed4e"/>
  <stop offset="100%" style="stop-color:#ffaa00"/>
</linearGradient>
```

**Drop Shadow:**
```svg
<filter id="dropShadow">
  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
  <feOffset dx="3" dy="3"/>
  <feComponentTransfer>
    <feFuncA type="linear" slope="0.5"/>
  </feComponentTransfer>
  <feMerge>
    <feMergeNode/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>
```

## Content Ideas

Great contentary slides compare:
- Free tier vs Enterprise tier
- Old tech vs New tech
- Promised features vs Reality
- User expectations vs Actual product
- Open source vs Proprietary
- Early startup vs Corporate
- Documentation vs Reality
- Marketing claims vs User experience

## Troubleshooting

**Slide not showing?**
- Check that files are named correctly (kebab-case)
- Verify both `.svg` and `.js` files exist
- Check browser console for errors
- Make sure server is running

**SVG looks wrong?**
- Verify viewBox is `0 0 1080 1920`
- Check that coordinates are within bounds
- Make sure gradients and filters are defined in `<defs>`

**Animations not working?**
- Test in different browsers (some effects vary)
- Check that `repeatCount` is set
- Verify timing values (dur, values)

## Advanced Techniques

### Responsive Text
```svg
<text x="540" y="250" font-size="80" text-anchor="middle">
  <tspan x="540" dy="0">Long Text That</tspan>
  <tspan x="540" dy="100">Wraps Lines</tspan>
</text>
```

### Layered Effects
```svg
<!-- Background -->
<rect ... fill="#1a1a1a"/>
<!-- Pattern overlay -->
<rect ... fill="url(#pattern)" opacity="0.3"/>
<!-- Content -->
<text ...>CONTENT</text>
<!-- Shine overlay -->
<rect ... fill="url(#shine)" opacity="0.2"/>
```

### Interactive Elements (Future)
```svg
<!-- This doesn't work yet, but we could add JavaScript handlers -->
<g class="clickable" onclick="alert('Clicked!')">
  <rect .../>
  <text ...>CLICK ME</text>
</g>
```

## Best Practices

1. **Keep it Simple**: Focus on the commentary, not technical complexity
2. **High Contrast**: Make sure text is readable
3. **Test on Mobile**: Slides are designed for phone screens
4. **Use Comments**: Document what each section does
5. **Reuse Patterns**: Copy successful techniques from other slides
6. **Be Funny**: The best contentary slides make people laugh and think

## File Structure Reference

```
wwwroot/contentary-slides/
├── _TEMPLATE.svg                              # Copy this
├── _TEMPLATE.js                               # And this
├── rent-a-chair-vs-spotiscription.svg         # Example
├── rent-a-chair-vs-spotiscription.js
└── your-slide-name.svg                        # Your new slide!
└── your-slide-name.js
```

## No Middleware Changes Needed!

Thanks to the dynamic routing system, you **don't need to edit any C# code** to add new slides. Just:
1. Create the `.svg` and `.js` files
2. Name them correctly
3. Add to the gallery HTML
4. Done! 🎉

## Getting Help

- Look at existing slides for examples
- Check `SVG-SHOWCASE-README.md` for SVG techniques
- Review the template comments for guidance
- Experiment! SVG is very forgiving

---

**Built with SaVaGe** - Now go make some contentary!
