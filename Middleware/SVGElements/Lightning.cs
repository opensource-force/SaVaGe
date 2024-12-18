using System;

// TODO: Move this too

// This is PRNG based on the system clock. Good enough for random lightning strikes, but if you need
// better randomness you should use another class.
internal class RandomGenerator
{

    internal static int GetRandomNumber(int min, int max)
    {
        if (min > max) 
        {
            var realMin = max;
            max = min;
            min = realMin;
        }
    
        return Random.Shared.Next(min, max);
    }

    internal static int GetOneOrNegativeOne() 
    {
        return Random.Shared.NextDouble() < 0.5 ? -1 : 1;
    }
}

internal class Lightning
{
    private readonly IWebHostEnvironment _env;
    private readonly Lazy<Task> _initializationTask;
    private string svg;
    private string originalSVG;

    internal Lightning(IWebHostEnvironment env)  
    {
        _env = env;
        _initializationTask = new Lazy<Task>(() => DoInitializeAsync());
    }

    internal async Task InitializeAsync() 
    {
        await _initializationTask.Value;
    }

    internal async Task DoInitializeAsync() 
    {
        svg = await ReadFileFromWebRootAsync(_env, "effects/lightning.svg"); 
        originalSVG = svg;
    }

    internal string Bolt(int startX, int startY, int endX, int endY, int jags, int delay) 
    {
         svg = originalSVG;

         var path = $"M{startX} {startY}";

         svg = svg.Replace("{{delay}}", $"{delay}");

         var jagX = (endX - startX) / (jags - 1);
         var jagY = (endY - startY) / (jags - 1);;

         var xDirection = 1;

         var lineX = startX;
         var lineY = startY;

         while(jags > 0) 
         {
             lineX = lineX + RandomGenerator.GetRandomNumber(3, Math.Abs(jagX)) * xDirection;
             lineY = lineY + RandomGenerator.GetRandomNumber(3, Math.Abs(jagY));

             xDirection = xDirection * -1;
  
             path = $"{path} L{lineX} {lineY}";

             jags--;
         }

         path = $"{path} L{endX} {endY}";

         var randomId = $"{RandomGenerator.GetRandomNumber(1, 100000)}";        
         svg = svg.Replace("{{randomId}}", randomId);

         return svg.Replace("{{boltPath}}", path);
    }

    // TODO: Move this to some shared utils file eventually

    internal async Task<string> ReadFileFromWebRootAsync(IWebHostEnvironment env, string fileName)
    {
         string filePath = Path.Combine(env.WebRootPath, fileName);
         if (!File.Exists(filePath))
         {
             throw new FileNotFoundException($"The file {fileName} was not found in wwwroot.");
         }
         string file = await File.ReadAllTextAsync(filePath);
         return file;
    }

}
