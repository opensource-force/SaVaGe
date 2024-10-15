using System;

// TODO: Move this too

// This is PRNG based on the system clock. Good enough for random lightning strikes, but if you need
// better randomness you should use another class.
public class RandomGenerator
{
    private static readonly Random _random = new Random();

    public static int GetRandomNumber(int min, int max)
    {
        lock (_random) // Thread-safe operation
        {
            return _random.Next(min, max);
        }
    }
}

public class Lightning
{
    private readonly IWebHostEnvironment _env;
    private readonly Lazy<Task> _initializationTask;
    private string svg;
    private string originalSVG;

    public Lightning(IWebHostEnvironment env)  
    {
        _env = env;
        _initializationTask = new Lazy<Task>(() => DoInitializeAsync());
    }

    public async Task InitializeAsync() 
    {
        await _initializationTask.Value;
    }

    public async Task DoInitializeAsync() 
    {
        svg = await ReadFileFromWebRootAsync(_env, "lightning.svg"); 
        originalSVG = svg;
    }

    public string Bolt(int startX, int startY, int endX, int endY, int jags, int delay) 
    {
         svg = originalSVG;

         string path = $"M{startX} {startY}";

         svg = svg.Replace("{{delay}}", $"{delay}");

         int jagX = (endX - startX) / (jags - 1);
         int jagY = (endY - startY) / (jags - 1);;

         int xDirection = 1;

         int lineX = startX;
         int lineY = startY;

         while(jags > 0) 
         {
             lineX = lineX + RandomGenerator.GetRandomNumber(3, Math.Abs(jagX)) * xDirection;
             lineY = lineY + RandomGenerator.GetRandomNumber(3, Math.Abs(jagY));

             xDirection = xDirection * -1;
  
             path = $"{path} L{lineX} {lineY}";

             jags--;
         }

         path = $"{path} L{endX} {endY}";

         string randomId = $"{RandomGenerator.GetRandomNumber(1, 100000)}";        
         svg = svg.Replace("{{randomId}}", randomId);

         return svg.Replace("{{boltPath}}", path);
    }

    // TODO: Move this to some shared utils file eventually

    public async Task<string> ReadFileFromWebRootAsync(IWebHostEnvironment env, string fileName)
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
