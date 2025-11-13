using System;

internal class Form
{
    internal async Task<string> FormJS(IWebHostEnvironment env) 
    {
         var js = await env.ReadFileFromWebRootAsync("containers/forms/the-form-engine.js");

         return js;
    }
}
