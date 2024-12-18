using System;
using System.Text;

public struct Point
{
    public int X { get; set; }
    public int Y { get; set; }
}

internal class ThreeWavyLines
{
    internal ThreeWavyLines()
    {

    }

    internal async Task<string> SVG(string wrapper, IWebHostEnvironment _env, int startX, int startY, int endX, int endY, int jags) 
    {
         var svg = await _env.ReadFileFromWebRootAsync("planet's-test-dir/three-wavy-lines.svg");;

         var xDirection = 1;

         var upDown = RandomGenerator.GetOneOrNegativeOne();
         var curves1_1 = new List<string>();
         var curves1_2 = new List<string>();
         var curves2_1 = new List<string>();
         var curves2_2 = new List<string>();
         var curves3_1 = new List<string>();
         var curves3_2 = new List<string>();

         var lineStart = $"M {startX},{startY}";

         List<Point> getSegments(int beginX, int beginY, int endX, int endY, int jags)
         {
              List<Point> points = new List<Point>();
    
	      // Add starting point
	      points.Add(new Point { X = beginX, Y = beginY });

	      // Get total distance for scaling
	      double totalDistance = Math.Sqrt(Math.Pow(endX - beginX, 2) + Math.Pow(endY - beginY, 2));
	      
	      // Generate random lengths that will sum to 1.0
	      double[] ratios = new double[jags];
	      double sum = 0;
	      for (int i = 0; i < jags; i++)
	      {
		  ratios[i] = Random.Shared.NextDouble();
		  sum += ratios[i];
	      }
	      
	      // Normalize the lengths so they sum to 1.0
	      for (int i = 0; i < jags; i++)
	      {
		  ratios[i] /= sum;
	      }
	      
	      // Calculate intermediate points
	      double currentX = beginX;
	      double currentY = beginY;
	      double deltaX = endX - beginX;
	      double deltaY = endY - beginY;
	      
	      for (int i = 0; i < jags - 1; i++)
	      {
		  // Move along the line by the random ratio
		  currentX += deltaX * ratios[i];
		  currentY += deltaY * ratios[i];
		  
		  points.Add(new Point { 
		      X = (int)Math.Round(currentX), 
		      Y = (int)Math.Round(currentY) 
		  });
	      }
	      
	      // Add ending point
	      points.Add(new Point { X = endX, Y = endY });
	      
	      return points;
         }

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

         string generateAnimatedPath(int startX, int startY, int endX, int endY, int jags)
	 {
            var start = new Point { X = startX, Y = startY };
            var end = new Point { X = endX, Y = endY };

	    // Helper function to join points into SVG path string
	    string makePath(List<Point> points, int curveDirection)
	    {
		StringBuilder path = new StringBuilder();
		path.Append($"M {start.X},{start.Y} ");  // Starting point
		
		// Generate curves between each segment
		for (int i = 1; i < points.Count; i++)
		{
		    path.Append(getCurve(
			points[i-1].X, points[i-1].Y,
			points[i].X, points[i].Y,
			curveDirection
		    ));
		    path.Append(" ");
		}
		
		return path.ToString().Trim();
	    }
	    
	    // Get base segments that we'll use for all paths
	    List<Point> segments = getSegments(start.X, start.Y, end.X, end.Y, jags);
	    
	    // Generate three paths for animation:
	    // First path: curves up
	    string path1 = makePath(segments, 1);
	    
	    // Second path: curves down
	    string path2 = makePath(segments, -1);
	    
	    // Third path: back to original
	    string path3 = makePath(segments, 1);
	    
	    // Join them all with semicolons for the animation
	    return $"{path1}; {path2}; {path3}";
	 }
   
         var values1 = generateAnimatedPath(startX, startY, endX, endY, jags);
         var values2 = generateAnimatedPath(startX, startY, endX, endY, jags);
         var values3 = generateAnimatedPath(startX, startY, endX, endY, jags);

         var moveStart = $"M {startX},{startY}";

         svg = svg.Replace("{{path1}}", moveStart);
         svg = svg.Replace("{{path2}}", moveStart);
         svg = svg.Replace("{{path3}}", moveStart);

         svg = svg.Replace("{{wiggle1}}", values1);
         svg = svg.Replace("{{wiggle2}}", values1);
         svg = svg.Replace("{{wiggle3}}", values1);


         return wrapper.Replace("{{contents}}", svg);
    }

}
