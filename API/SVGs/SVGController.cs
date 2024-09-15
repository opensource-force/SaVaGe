using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using SAVAGE.Server.Models;

namespace SAVAGE.API.SVGs
{
    [ApiController]
    [Route("/svg/{svg}")]
    public class SVGController: ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<SVGModel> Get(string svg) 
        {
            Console.WriteLine(svg);
            switch(svg) {
                case "planet-nine-logo": 
                Console.WriteLine("fofofofofo");
                return new PlanetNineLogo();
            }
            Console.WriteLine("barbabrbara");
            return new SVGModel();
        }
    }
}