/*using System;

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
         var curves1_1 = new List<string>();
         var curves1_2 = new List<string>();
         var curves2_1 = new List<string>();
         var curves2_2 = new List<string>();
         var curves3_1 = new List<string>();
         var curves3_2 = new List<string>();

         var lineStart = $"M {startX},{startY}";

         string getCurve(int beginX, int beginY, int endX, int endY, int curveUpDown)
         {
	      // Calculate deltas to determine which axis gets the curve modifier
	      int deltaX = Math.Abs(endX - beginX);
	      int deltaY = Math.Abs(endY - beginY);
	      
	      // Get random control points
	      int control1X = RandomGenerator.GetRandomNumber(beginX, endX);
	      int control1Y = RandomGenerator.GetRandomNumber(beginY, endY);
	      int control2X = RandomGenerator.GetRandomNumber(beginX, endX);
	      int control2Y = RandomGenerator.GetRandomNumber(beginY, endY);

	      // Apply the curve modifier based on which delta is larger
	      if (deltaX > deltaY)
	      {
		  // Modify Y values if X distance is greater
		  control1Y = control1Y + (Math.Abs(endY - beginY) / 2 * curveUpDown);
		  control2Y = control2Y + (Math.Abs(endY - beginY) / 2 * curveUpDown);
	      }
	      else
	      {
		  // Modify X values if Y distance is greater or equal
		  control1X = control1X + (Math.Abs(endX - beginX) / 2 * curveUpDown);
		  control2X = control2X + (Math.Abs(endX - beginX) / 2 * curveUpDown);
	      }

	      // Return formatted SVG curve command
	      return $"C {control1X},{control1Y} {control2X},{control2Y} {endX},{endY}";
         }

         while(jags > 0) 
         {
         //    lineX = lineX + RandomGenerator.GetRandomNumber(3, Math.Abs(jagX)) * xDirection;
         //    lineY = lineY + RandomGenerator.GetRandomNumber(3, Math.Abs(jagY));

             curves1_1.Add(getCurve( // what goes here?

             xDirection = xDirection * -1;
  
             path = $"{path} L{lineX} {lineY}";

             jags--;
         }

         path = $"{path} L{endX} {endY}";

         var randomId = $"{RandomGenerator.GetRandomNumber(1, 100000)}";        
         svg = svg.Replace("{{randomId}}", randomId);

         return svg.Replace("{{boltPath}}", path);
    }

}*/
