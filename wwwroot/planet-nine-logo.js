(() => {
    const container = document.getElementById('planet-nine-logo-container') || document.createElement('div');
    if(!container.id) {
      document.body.appendChild(container);
    }
    const width = 800;
    const height = 500;

    const starStrings = [];
    for(var i = 0; i < 50; i++) {
      const cx = Math.random() * width;
      const cy = Math.random() * height;
      const r = Math.random() * 10 + 1;
      starStrings.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="white"/>`);
    }
    const starSVG = starStrings.join('\r\n');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="navy"/>
      <g id="stars">
        ${starSVG}
      </g>

      <defs>
	<radialGradient id="shine" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
	  <stop offset="0%" style="stop-color:rgb(60,60,60);stop-opacity:1" />
	  <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
	</radialGradient>
	<filter id="glow">
	  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
	  <feMerge>
	    <feMergeNode in="coloredBlur"/>
	    <feMergeNode in="SourceGraphic"/>
	  </feMerge>
	</filter>
      </defs>
      
      <circle cx="100" cy="100" r="90" fill="url(#shine)" />
      
      <text x="100" y="105" font-family="Courier, monospace" font-size="24" fill="#00ff00" text-anchor="middle" filter="url(#glow)">
	READY.
      </text>

      <rect x="200" y="75" width="300" height="150" rx="20" ry="20" fill="#00843D" stroke="white" stroke-width="5"/>
      <text x="350" y="145" font-family="Arial, sans-serif" font-size="40" fill="white" text-anchor="middle">Population</text>
      <text x="350" y="195" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">?</text>
    </svg>`;

    const container = document.getElementById('planet-nine-logo-container').innerHTML = svg;
})();

