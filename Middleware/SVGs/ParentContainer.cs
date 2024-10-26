using System;

internal class ParentContainer
{
    internal ParentContainer() 
    {
        
    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, string parentElementId, string decoration = "") 
    {
        var svg = "";

        var js = await _env.ReadFileFromWebRootAsync("containers/parent/parent.js");
        js = js.Replace("{{parentElement}}", parentElementId);

        var parent = new Parent();
        svg = await parent.SVG(js, _env, "100", "100", "blue");
Console.WriteLine(decoration);

        var decorationSVG = "";

        switch (decoration)
        {
            case "reveal": decorationSVG = "<image content-fit=cover height=100% width=100% preserveAspectRatio=none href=https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fassets.vg247.com%2Fcurrent%2F2016%2F01%2Fdragon_quest_generic_slime.jpg&f=1&nofb=1&ipt=660cf96ec829f275feffa86f0bdce59a41dfcda24ad66699ec1af74a2734f0ca&ipo=images></image>";
                break;
            case "houseplant": decorationSVG = "<image content-fit=cover height=100% width=100% preserveAspectRatio=none href=https://www.plantandflowerinfo.com/images/basic-houseplant-careOG.jpg></image>";
                break;
        }
Console.WriteLine(decorationSVG);

        svg = svg.Replace("{{contents}}", decorationSVG);

        return wrapper.Replace("{{contents}}", svg);
    }
}
