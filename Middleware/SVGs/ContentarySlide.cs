using System;
using System.Threading.Tasks;

internal class ContentarySlide
{
    internal ContentarySlide()
    {
    }

    // Generic method to load any contentary slide by name
    internal async Task<string> GetSlide(string wrapper, IWebHostEnvironment _env, string slideName)
    {
        var js = await _env.ReadFileFromWebRootAsync($"contentary-slides/{slideName}.js");
        var svg = await _env.ReadFileFromWebRootAsync($"contentary-slides/{slideName}.svg");

        js = js.Replace("{{contents}}", svg);

        return wrapper.Replace("{{contents}}", js);
    }

    // Legacy method for backwards compatibility
    internal async Task<string> RentAChairVsSpotiscription(string wrapper, IWebHostEnvironment _env)
    {
        return await GetSlide(wrapper, _env, "rent-a-chair-vs-spotiscription");
    }
}
