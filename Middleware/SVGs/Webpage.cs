using System;

public class Webpage
{
    public Webpage() 
    {
        
    }

    public async Task<string> Juliaswitch(string wrapper, IWebHostEnvironment _env, string backgroundColor) 
    {
        string svg = "";
        string svgContent = "";

        Link linker = new Link();
        Image image = new Image();

        Background background = new Background();
        svg = await background.SVG("{{contents}}", _env, backgroundColor);

        float begin = 0.5F;
        float delay = 1.5F;
        int animation = 0;

        Opacity opacity = new Opacity();
        string animation1 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        string animation2 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        string animation3 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        string animation4 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        string animation5 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        string animation6 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        string animation7 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");
        string animation8 = await opacity.SVG("{{contents}}", _env, "0;1", $"{delay * animation++ + begin}s", "1s", "freeze");

        Text text = new Text();
        string youAreNotANumber = await text.SVG("{{contents}}", _env, "50%", "10%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "You are not a number.", animation1);        
        string phoneNumber = await text.SVG("{{contents}}", _env, "50%", "20%", "bold", "18", "#32cd32", "#32cd32", "line-through", "0", "867-5309", animation2);        
        string youAreNotAnEmail = await text.SVG("{{contents}}", _env, "50%", "30%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "You are not an email", animation3);        
        string email = await text.SVG("{{contents}}", _env, "50%", "40%", "bold", "18", "#32cd32", "#32cd32", "line-through", "0", "trackme@somemail.com", animation4);        

        string juliaswitch = await text.SVG("{{contents}}", _env, "50%", "50%", "bold", "28", "#A9A9A9", "#COCOCO", "none", "0", "juliaswitch", animation5);

        string juliaLink = await linker.SVG("{{contents}}", _env, "https://en.wikipedia.org/wiki/Julia_O%27Connor");
        string juliaImage = await image.SVG(juliaLink, _env, "25%", "50%", "6%", "9%", "https://upload.wikimedia.org/wikipedia/en/b/bb/Julia_O%27Connor.jpg", animation5);

        string noRandos = await text.SVG("{{contents}}", _env, "50%", "60%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "No spam; No randos; No stalkers; No bots", animation6);        
        string onlyConnect = await text.SVG("{{contents}}", _env, "50%", "67%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "<tspan x=\"50%\" dy=\"0\">Only connect with who you want, and disconnect at any time.</tspan><tspan x=\"50%\" dy=\"1.2em\">The world's first anonymous zero-discovery messenger app.</tspan>", animation7);        
        string comingSoon = await text.SVG("{{contents}}", _env, "50%", "80%", "bold", "18", "#32cd32", "#32cd32", "none", "0", "Coming November 6th.", animation8);        
        string because = await text.SVG("{{contents}}", _env, "50%", "85%", "bold", "8", "#32cd32", "#32cd32", "none", "0", "(because either way it goes, you know there's gonna be some people you don't want to talk to)", animation8);        


        svgContent = svgContent + youAreNotANumber + phoneNumber + youAreNotAnEmail + email; 
        svgContent = svgContent + juliaswitch + juliaImage + noRandos + onlyConnect + comingSoon + because;


        string osfLink = await linker.SVG("{{contents}}", _env, "https://opensourceforce.net");

        string osfContainer = @"<svg x=""5%"" y=""75%"" width=""15%"" height=""15%"" viewBox=""0 0 200 240"">
              {{contents}}
              </svg>
            </svg>";

        osfLink = osfLink.Replace("{{contents}}", osfContainer);

        OSFLogo osfLogo = new OSFLogo();
        string osf = await osfLogo.SVG(osfLink, _env); 

        svgContent = svgContent + osf;

       /* string planetNineContainer = @"<svg cx=""50"" y=""75"" width=""20"" height=""20"">
            {{contents}}
            </svg>";

        PlanetNineLogo planetNineLogo = new PlanetNineLogo();
        string pn = planetNineLogo.SVG(planetNineContainer, _env);

        string savageContainer = @"<svg cx=""50"" y=""75"" width=""20"" height=""20"">
            {{contents}}
            </svg>";

        SavageLogo savageLogo = new SavageLogo();
        string savage = savageLogo.SVG(savageContainer, _env);
*/
        svg = svg.Replace("{{svgContent}}", svgContent);

        return wrapper.Replace("{{contents}}", svg);
    }
}
