const createGrid = (containerElement, count = 5) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const safeCount = Math.min(Math.max(1, count), 32);
 
      const displayElements = {{displayElements}};

      const getLayout = (displayElements, safeCount) => {
        let rows = 1;
        let columns = 0;
        let maxColumns = 4;
        let maxRows = 4;
        for(var i = 0; i < Math.min(safeCount, displayElements.length); i++) {
          columns++;
          if(columns > maxColumns) {
            rows++;
            columns = 1;
            continue();
          }
          if(rows > maxRows) {
            if(windowWidth > windowHeight) {
              maxColumns++;
            } else {
              maxRows++;
            }
          }
        } 
        return { rows, columns };
      };
      
      let svgString = `
        <svg width="100%" height="100%" viewBox="0 0 ${layout.cols * 120} ${layout.rows * 120}" 
             preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#8A2BE2"/>
              <stop offset="100%" stop-color="#50C878"/>
            </linearGradient>
            
            <clipPath id="circleClip">
              <circle cx="50" cy="50" r="45"/>
            </clipPath>
          </defs>
      `;
      
      // Generate circles
      for (let i = 0; i < safeCount; i++) {
        const row = Math.floor(i / layout.cols);
        const col = i % layout.cols;
        const x = col * 120 + 10;
        const y = row * 120 + 10;
        
        svgString += `
          <g transform="translate(${x}, ${y})">
            <image
              x="0" y="0"
              width="100" height="100"
              href="/api/placeholder/100/100?text=${i + 1}"
              clip-path="url(#circleClip)"
            />
            <circle 
              cx="50" cy="50" r="45"
              fill="none"
              stroke="url(#borderGradient)"
              stroke-width="3"
            />
          </g>
        `;
      }
      
      svgString += '</svg>';
      
      // Insert the SVG into the container
      containerElement.innerHTML = svgString;
    }

    // Initial creation
    const container = document.getElementById('svgContainer');
    createCircleGrid(container, 12); // Try with 12 circles

    // Optional: Update on window resize for better responsive behavior
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        createCircleGrid(container, 12);
      }, 250);
    });
