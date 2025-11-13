# AdvanceKey Button Templates

Three generic SVG button templates for the AdvanceKey iOS keyboard extension. Each button includes dynamic spell and spell-component attributes for MAGIC protocol integration.

## Templates Available

### 1. One-Button Template
**Path:** `/templates/advancekey/one-button.js`

Single centered button, perfect for primary actions.

### 2. Two-Button Template
**Path:** `/templates/advancekey/two-button.js`

Two side-by-side buttons, ideal for binary choices (Yes/No, Accept/Decline, etc.).

### 3. Three-Button Template
**Path:** `/templates/advancekey/three-button.js`

Three buttons in a row, great for multiple options or navigation.

## Usage

### Basic One-Button Example

```html
<div id="spell-button"></div>
<script src="http://localhost:5000/templates/advancekey/one-button.js?containerId=spell-button&buttonText1=Cast%20Spell&spell1=arethaUserPurchase&spellComponent1=ticket&buttonColor1=%238b5cf6&buttonColor2=%236d28d9&fontSize=16"></script>
```

### Two-Button Example (Accept/Decline)

```html
<div id="contract-buttons"></div>
<script src="http://localhost:5000/templates/advancekey/two-button.js?containerId=contract-buttons&buttonText1=Accept&buttonText2=Decline&spell1=signContract&spellComponent1=step1&spell2=declineContract&spellComponent2=cancel&buttonColor1=%2310b981&buttonColor2=%230d9488&buttonColor3=%23ef4444&buttonColor4=%23dc2626&fontSize=14"></script>
```

### Three-Button Example (Navigation)

```html
<div id="nav-buttons"></div>
<script src="http://localhost:5000/templates/advancekey/three-button.js?containerId=nav-buttons&buttonText1=Previous&buttonText2=Save&buttonText3=Next&spell1=navigate&spellComponent1=prev&spell2=saveRecipe&spellComponent2=current&spell3=navigate&spellComponent3=next&buttonColor1=%238b5cf6&buttonColor2=%236d28d9&buttonColor3=%23ec4899&buttonColor4=%23db2777&buttonColor5=%2310b981&buttonColor6=%230d9488&fontSize=14"></script>
```

## Parameters

### Common Parameters (All Templates)

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `containerId` | DOM element ID to inject SVG | Auto-generated | `spell-button` |
| `fontSize` | Button text size in px | `16` | `14` |

### One-Button Parameters

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| `buttonText1` | Text displayed on button | Yes | `Cast Spell` |
| `spell1` | MAGIC spell name | Yes | `arethaUserPurchase` |
| `spellComponent1` | Spell component/parameter | Yes | `ticket` |
| `buttonColor1` | Gradient start color | Yes | `#8b5cf6` (purple) |
| `buttonColor2` | Gradient end color | Yes | `#6d28d9` (darker purple) |

### Two-Button Parameters

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| `buttonText1` | Button 1 text | Yes | `Accept` |
| `spell1` | Button 1 spell | Yes | `signContract` |
| `spellComponent1` | Button 1 component | Yes | `step1` |
| `buttonColor1` | Button 1 gradient start | Yes | `#10b981` (green) |
| `buttonColor2` | Button 1 gradient end | Yes | `#0d9488` |
| `buttonText2` | Button 2 text | Yes | `Decline` |
| `spell2` | Button 2 spell | Yes | `declineContract` |
| `spellComponent2` | Button 2 component | Yes | `cancel` |
| `buttonColor3` | Button 2 gradient start | Yes | `#ef4444` (red) |
| `buttonColor4` | Button 2 gradient end | Yes | `#dc2626` |

### Three-Button Parameters

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| `buttonText1` | Button 1 text | Yes | `Previous` |
| `spell1` | Button 1 spell | Yes | `navigate` |
| `spellComponent1` | Button 1 component | Yes | `prev` |
| `buttonColor1` | Button 1 gradient start | Yes | `#8b5cf6` (purple) |
| `buttonColor2` | Button 1 gradient end | Yes | `#6d28d9` |
| `buttonText2` | Button 2 text | Yes | `Save` |
| `spell2` | Button 2 spell | Yes | `saveRecipe` |
| `spellComponent2` | Button 2 component | Yes | `current` |
| `buttonColor3` | Button 2 gradient start | Yes | `#ec4899` (pink) |
| `buttonColor4` | Button 2 gradient end | Yes | `#db2777` |
| `buttonText3` | Button 3 text | Yes | `Next` |
| `spell3` | Button 3 spell | Yes | `navigate` |
| `spellComponent3` | Button 3 component | Yes | `next` |
| `buttonColor5` | Button 3 gradient start | Yes | `#10b981` (green) |
| `buttonColor6` | Button 3 gradient end | Yes | `#0d9488` |

## Planet Nine Color Palette

Recommended colors for consistency:

```
Purple:  #8b5cf6 → #6d28d9
Pink:    #ec4899 → #db2777
Green:   #10b981 → #0d9488
Blue:    #3b82f6 → #2563eb
Yellow:  #fbbf24 → #f59e0b
Red:     #ef4444 → #dc2626
```

## Swift Integration (AdvanceKey)

### 1. Add Message Handler

In `KeyboardViewController.swift`:

```swift
// Add to viewDidLoad()
let contentController = WKUserContentController()
contentController.add(self, name: "spellCast")
webViewConfig.userContentController = contentController
```

### 2. Handle Spell Cast Messages

```swift
// Implement WKScriptMessageHandler
func userContentController(_ userContentController: WKUserContentController,
                           didReceive message: WKScriptMessage) {
    if message.name == "spellCast" {
        guard let data = message.body as? [String: Any],
              let spell = data["spell"] as? String,
              let spellComponent = data["spellComponent"] as? String else {
            return
        }

        NSLog("ADVANCEKEY: Casting spell: \(spell) with component: \(spellComponent)")

        // Cast the spell using your MAGIC implementation
        castSpell(spell: spell, component: spellComponent)
    }
}

func castSpell(spell: String, component: String) {
    // Your spell casting logic here
    // Example: Call Fount's /resolve endpoint
}
```

### 3. Load Template in WebView

```swift
// Example: Load two-button template for contract signing
let contractPubKey = "02a1b2c3..."
let isParticipant = true

let buttonText1 = isParticipant ? "Sign" : "View"
let spell1 = isParticipant ? "signContract" : "viewContract"

let url = """
http://localhost:5000/templates/advancekey/two-button.js?\
containerId=contract-actions&\
buttonText1=\(buttonText1)&\
buttonText2=Decline&\
spell1=\(spell1)&\
spellComponent1=\(contractPubKey)&\
spell2=declineContract&\
spellComponent2=\(contractPubKey)&\
buttonColor1=%2310b981&\
buttonColor2=%230d9488&\
buttonColor3=%23ef4444&\
buttonColor4=%23dc2626&\
fontSize=14
"""

webView.loadHTMLString("""
<html>
<head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:10px;">
  <div id="contract-actions"></div>
  <script src="\(url)"></script>
</body>
</html>
""", baseURL: URL(string: "http://localhost:5000"))
```

## Event Handling

Buttons dispatch two types of events:

### 1. Swift Message (Primary)
```javascript
window.webkit.messageHandlers.spellCast.postMessage({
  spell: "arethaUserPurchase",
  spellComponent: "ticket",
  timestamp: 1234567890
});
```

### 2. JavaScript Event (Fallback)
```javascript
window.addEventListener('advancekey-spell-cast', (e) => {
  console.log(e.detail.spell, e.detail.spellComponent);
});
```

## Examples

See `advancekey-examples.html` for live examples of all three templates with various configurations.

## Architecture

These templates use the SaVaGe convention-based routing system:

- **No C# code needed** - Pure template-based
- **Query params auto-map** to mustache placeholders
- **SVG + JS composition** happens automatically
- **Zero server-side logic** - Just drop files and use

### File Structure
```
wwwroot/
  templates/
    advancekey/
      one-button/
        one-button.svg   ← SVG template with {{placeholders}}
        one-button.js    ← JS wrapper with event handlers
      two-button/
        two-button.svg
        two-button.js
      three-button/
        three-button.svg
        three-button.js
```

### Request Flow
```
GET /templates/advancekey/one-button.js?spell1=mySpell&buttonText1=Click
    ↓
Middleware loads: one-button.svg + one-button.js
    ↓
Replaces: {{spell1}} → "mySpell", {{buttonText1}} → "Click"
    ↓
Returns: JavaScript with embedded SVG
```

## Tips

1. **URL Encode Special Characters**
   - Spaces: `%20` or `+`
   - Hash (#): `%23`
   - Example: `#8b5cf6` → `%238b5cf6`

2. **Container Size**
   - Templates are 400x100px by default
   - Scale container to fit your keyboard height
   - Use CSS `transform: scale()` if needed

3. **Accessibility**
   - Button text should be descriptive
   - Avoid relying solely on color
   - Consider adding ARIA labels if needed

4. **Performance**
   - Templates are lightweight (~2KB each)
   - SVG renders instantly
   - No external dependencies

---

**Need more buttons?** Create a processor for dynamic button generation or compose multiple templates.
