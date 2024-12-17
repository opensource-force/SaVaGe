using System;

internal class ThreeWavyLines
{
    internal ThreeWavyLines()
    {

    }

    internal string Bolt(int startX, int startY, int endX, int endY, int jags) 
    {
         svg = originalSVG;

         var path = $"M{startX} {startY}";

         var jagX = (endX - startX) / (jags - 1);
         var jagY = (endY - startY) / (jags - 1);

         var xDirection = 1;

         var upDown = RandomGenerator.GetOneOrNegativeOne();
         var curves1_1 = string[jags * 3];
         var curves1_2 = string[jags * 3];
         var curves2_1 = string[jags * 3];
         var curves2_2 = string[jags * 3];
         var curves3_1 = string[jags * 3];
         var curves3_2 = string[jags * 3];

         var lineStart = $"M {startX},{startY}";

         while(jags > 0) 
         {
         //    lineX = lineX + RandomGenerator.GetRandomNumber(3, Math.Abs(jagX)) * xDirection;
         //    lineY = lineY + RandomGenerator.GetRandomNumber(3, Math.Abs(jagY));

               

             xDirection = xDirection * -1;
  
             path = $"{path} L{lineX} {lineY}";

             jags--;
         }

         path = $"{path} L{endX} {endY}";

         var randomId = $"{RandomGenerator.GetRandomNumber(1, 100000)}";        
         svg = svg.Replace("{{randomId}}", randomId);

         return svg.Replace("{{boltPath}}", path);
    }

}
