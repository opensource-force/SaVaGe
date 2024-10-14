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
    public async Task<string> Bolt(IWebHostEnvironment env, int startX, int startY, int endX, int endY, int jags, int delay) 
    {
         string svg = await ReadFileFromWebRootAsync(env, "lightning.svg");
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
        string randomId = $"{RandomGenerator.GetRandomNumber(1, 100000)}";
        
        return file.Replace("{{randomId}}", randomId);
    }

}
