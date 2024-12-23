using System;

internal class Webpage
{
    internal Webpage() 
    {
        
    }

    internal async Task<string> MAGICAndTeleportation(string wrapper, IWebHostEnvironment _env)
    {
        var svg = "";
        var svgContent = "";

        var js = "";

        var linker = new Link();
        var image = new Image();

        var background = new Background();
        svg = await background.SVG("{{contents}}", _env, "url(#background)");
        
        var magic = await _env.ReadFileFromWebRootAsync("planet's-test-dir/magic.svg");

        var lightningBolt = new Lightning();
        var bolt = await lightningBolt.Bolt("{{contents}}", _env, 400, 50, 425, 200, 3, "0.2s");
        magic = magic.Replace("{{lightningBolt}}", bolt);

        magic = magic.Replace("{{MAGICFire}}", "");
        
        var pes = new SVGParticleEmitter();
        js = js + pes;

        var 

        var threeWavyLines = new ThreeWavyLines();
        var beam = await threeWavyLines.SVG("{{contents}}", _env, 175, 300, 225, 165, 4);
        magic = magic.Replace("{{threeWavyLines}}", beam);

        svg = svg + magic;

        var teleportation = await _env.ReadFileFromWebRootAsync("planet's-test-dir/teleportation.svg");
        teleportation = teleportation.Replace("{{x}}", "50%").Replace("{{y}}", "0");
        svg = svg + teleportation;

        var linearGradient = new LinearGradient();
        svg = await linearGradient.SVG(svg, _env, "background", "0%", "0%", "100%", "0%", "0%", "100%", "purple", "green");
        wrapper = wrapper.Replace("{{additionalJS}}", js);
        return wrapper.Replace("{{contents}}", svg);
    }

    internal async Task<string> Juliaswitch(string wrapper, IWebHostEnvironment _env, string backgroundColor) 
    {
        var svg = "";
        var svgContent = "";

        var linker = new Link();
        var image = new Image();

        var background = new Background();
        svg = await background.SVG("{{contents}}", _env, backgroundColor);

        var begin = 0.5F;
        var delay = 1.5F;
        var animation = 0;

        var opacity = new Opacity();
        var animation1 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        var animation2 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        var animation3 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        var animation4 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        var animation5 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        var animation6 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        var animation7 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        var animation8 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");

        var text = new Text();
        var youAreNotANumber = await text.SVG("{{contents}}", _env, "50%", "10%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "You are not a number.", animation1);        
        var phoneNumber = await text.SVG("{{contents}}", _env, "50%", "20%", "bold", "18", "#32cd32", "#32cd32", "line-through", "0", "867-5309", animation2);        
        var youAreNotAnEmail = await text.SVG("{{contents}}", _env, "50%", "30%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "You are not an email", animation3);        
        var email = await text.SVG("{{contents}}", _env, "50%", "40%", "bold", "18", "#32cd32", "#32cd32", "line-through", "0", "trackme@somemail.com", animation4);        

        var juliaswitch = await text.SVG("{{contents}}", _env, "50%", "50%", "bold", "36", "#A9A9A9", "#COCOCO", "none", "0", "juliaswitch", animation5);

        var juliaLink = await linker.SVG("{{contents}}", _env, "https://en.wikipedia.org/wiki/Julia_O%27Connor");
        var juliaImage = await image.SVG("{{contents}}", _env, "20%", "41%", "6%", "9%", "0", "https://upload.wikimedia.org/wikipedia/en/b/bb/Julia_O%27Connor.jpg", animation5);
        var juliaOConnor = await text.SVG("{{contents}}", _env, "25%", "53%", "none", "12", "#000000", "#ffffff", "none", "0", "Julia O'Connor", animation5);

        juliaLink = juliaLink.Replace("{{contents}}", juliaImage + juliaOConnor);

        var noRandos = await text.SVG("{{contents}}", _env, "50%", "60%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "No spam; No randos; No stalkers; No bots", animation6);        
        var onlyConnect = await text.SVG("{{contents}}", _env, "50%", "67%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "<tspan x=\"50%\" dy=\"0\">Only connect with who you want, and disconnect at any time.</tspan><tspan x=\"50%\" dy=\"1.2em\">The world's first anonymous zero-discovery messenger app.</tspan>", animation7);        
        var comingSoon = await text.SVG("{{contents}}", _env, "50%", "80%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "Coming November 6th.", animation8);        
        var because = await text.SVG("{{contents}}", _env, "50%", "85%", "bold", "8", "#32cd32", "#32cd32", "none", "0", "(because either way it goes, you know there's gonna be some people you don't want to talk to)", animation8);        
        var reminderLink = await linker.SVG("{{contents}}", _env, "https://duckduckgo.com/?q=how+to+set+a+reminder+for+november+6th");
        var reminderText = await text.SVG(reminderLink, _env, "75%", "35%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "Setup a reminder", animation8);

        svgContent = svgContent + youAreNotANumber + phoneNumber + youAreNotAnEmail + email; 
        svgContent = svgContent + juliaswitch + juliaLink + noRandos + onlyConnect + comingSoon + reminderText + because;

        var planetNineLink = await linker.SVG("{{contents}}", _env, "https://www.github.com/planet-nine-app");
       
        var planetNineContainer = @"<svg x=""5%"" y=""55%"" width=""15%"" height=""15%"" viewBox=""0 0 200 140"">
              {{contents}}
              </svg>
            "; 

        planetNineLink = planetNineLink.Replace("{{contents}}", planetNineContainer);
        
        PlanetNineLogo planetNineLogo = new PlanetNineLogo(_env);
        var planetNineLogoSVG = await planetNineLogo.SVG();

        planetNineLink = planetNineLink.Replace("{{contents}}", planetNineLogoSVG);

        var osfLink = await linker.SVG("{{contents}}", _env, "https://opensourceforce.net");

        var osfContainer = @"<svg x=""5%"" y=""75%"" width=""15%"" height=""15%"" viewBox=""0 0 200 240"">
              {{contents}}
              </svg>";

        osfLink = osfLink.Replace("{{contents}}", osfContainer);

        var osfLogo = new OSFLogo();
        var osf = await osfLogo.SVG(osfLink, _env); 

        var savageLink = await linker.SVG("{{contents}}", _env, "https://www.github.com/opensource-force/SaVaGe");

        var savageContainer = @"<svg x=""80%"" y=""55%"" width=""15%"" height=""15%"" viewBox=""0 0 300 360"">
              {{contents}}
              </svg>
            "; 

        savageLink = savageLink.Replace("{{contents}}", savageContainer);
        
        var savageLogo = new SaVaGeLogo();
        var savageLogoSVG = await savageLogo.SVG(savageLink, _env);

        svgContent = svgContent + planetNineLink + osf + savageLogoSVG + "\r\n</svg>";

       /* var planetNineContainer = @"<svg cx=""50"" y=""75"" width=""20"" height=""20"">
            {{contents}}
            </svg>";

        var planetNineLogo = new PlanetNineLogo();
        var pn = planetNineLogo.SVG(planetNineContainer, _env);

        var savageContainer = @"<svg cx=""50"" y=""75"" width=""20"" height=""20"">
            {{contents}}
            </svg>";

        SavageLogo savageLogo = new SavageLogo();
        var savage = savageLogo.SVG(savageContainer, _env);
*/
        svg = svg.Replace("{{contents}}", svgContent);

        return wrapper.Replace("{{contents}}", svg);
    }
}
