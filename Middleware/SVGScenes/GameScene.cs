using System;

internal class GameScene
{
    internal GameScene() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string substrings = "['parent']", string viewBoxWidth = "100", string viewBoxHeight = "100", string backgroundColor = "blue") 
    {
        var js = await _env.ReadFileFromWebRootAsync("game-scene/decorate.js");
        js = js.Replace("{{substrings}}", substrings);
        
        var diceRoll = RandomGenerator.GetRandomNumber(0, 9);
Console.WriteLine(diceRoll);
        if (diceRoll < 5)
        {
            js = js.Replace("{{decoration}}", "reveal");
        } else {
            js = js.Replace("{{decoration}}", "houseplant");
        }

        return wrapper.Replace("{{contents}}", js);
    }
}
