using System;

public class OSFLogo
{
    public OSFLogo() 
    {
        
    }

    public async Task<string> SVG(string wrapper, IWebHostEnvironment _env) 
    {
        string svg = "";

        Shield shield = new Shield();
        string shieldSVG = await shield.Text(_env);

        Lightning lightning = new Lightning(_env);
        await lightning.InitializeAsync();

        string bolt = lightning.Bolt(60, 30, 30, 200, 4, 0);
        string bolt2 = lightning.Bolt(120, 30, 100, 200, 6, 2);
        string bolt3 = lightning.Bolt(250, 30, 160, 200, 5, 4);

        OpenSourceForce openSourceForce = new OpenSourceForce();
        string openSourceForceText = await openSourceForce.Text(_env);

        svg = shieldSVG + bolt + bolt2 + bolt3 + openSourceForceText;

        return wrapper.Replace("{{contents}}", svg);
    }
}
