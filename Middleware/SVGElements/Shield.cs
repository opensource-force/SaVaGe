using System;

internal class Shield
{
    internal async Task<string> Text(IWebHostEnvironment env) 
    {
         var svg = await env.ReadFileFromWebRootAsync("logos/osf-logo/osf-shield.svg");

         // Lots of things can be dynamic with this text, and here is where you can add that
         
         return svg;
    }
}
