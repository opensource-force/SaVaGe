using System;

internal class OSFLogo
{
    internal OSFLogo() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env) 
    {
        var svg = "";

        var shield = new Shield();
        var shieldSVG = await shield.Text(_env);

        var lightning = new Lightning(_env);
        await lightning.InitializeAsync();

        var bolt = lightning.Bolt(60, 30, 30, 200, 4, 0);
        var bolt2 = lightning.Bolt(120, 30, 100, 200, 6, 2);
        var bolt3 = lightning.Bolt(250, 30, 160, 200, 5, 4);

        var openSourceForce = new OpenSourceForce();
        var openSourceForceText = await openSourceForce.Text(_env);

        svg = shieldSVG + bolt + bolt2 + bolt3 + openSourceForceText;

        return wrapper.Replace("{{contents}}", svg);
    }
}
