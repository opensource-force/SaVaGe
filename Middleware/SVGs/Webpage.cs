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

        Background background = new Background();
        svg = await background.SVG("{{contents}}", _env, backgroundColor);

        Opacity opacity = new Opacity();
        string animation1 = await opacity.SVG("{{contents}}", _env, "0;1", "0.3s", "1s", "freeze");
        string animation2 = await opacity.SVG("{{contents}}", _env, "0;1", "1.3s", "1s", "freeze");
        string animation3 = await opacity.SVG("{{contents}}", _env, "0;1", "2.3s", "1s", "freeze");
        string animation4 = await opacity.SVG("{{contents}}", _env, "0;1", "3.3s", "1s", "freeze");

        Text text = new Text();
        string youAreNotANumber = await text.SVG("{{contents}}", _env, "50%", "10%", "bold", "18", "#32cd32", "none", "0", "You are not a number.", animation1);        
        string phoneNumber = await text.SVG("{{contents}}", _env, "50%", "20%", "bold", "18", "#32cd32", "line-through", "0", "867-5309", animation2);        
        string youAreNotAnEmail = await text.SVG("{{contents}}", _env, "50%", "30%", "bold", "18", "#32cd32", "none", "0", "You are not an email", animation3);        
        string email = await text.SVG("{{contents}}", _env, "50%", "40%", "bold", "18", "#32cd32", "line-through", "0", "trackme@somemail.com", animation4);        


        svgContent = svgContent + youAreNotANumber + phoneNumber + youAreNotAnEmail + email; 




        string osfContainer = @"<svg x=""5%"" y=""75%"" width=""15%"" height=""15%"" viewBox=""0 0 200 240"">
              {{contents}}
              </svg>
            </svg>";

        OSFLogo osfLogo = new OSFLogo();
        string osf = await osfLogo.SVG(osfContainer, _env); 

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
