using System.Reflection.Metadata.Ecma335;

namespace SAVAGE.Server.Models
{
    public record SVGModel
    {
        private const string DefaultSVG = @"
            <svg xmlns=""http://www.w3.org/2000/svg"" width=""300"" height=""150"">
                <text x=""150"" y=""75"" font-family=""Arial, sans-serif"" font-size=""20"" fill=""black"" text-anchor=""middle"">Put an SVG here</text>
            </svg>
            ";

        public string SVG { get; init; }

        public SVGModel() : this(DefaultSVG) { }

        public SVGModel(string svg)
        {
            Console.WriteLine("baz     " + svg);
            SVG = svg ?? DefaultSVG;
            Console.WriteLine("bop        " + SVG);
        }
    }
}