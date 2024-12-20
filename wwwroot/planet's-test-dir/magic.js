const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
    <defs>
      <!-- Define gradients and filters for magical effects -->
      <radialGradient id="sparkle" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
	<stop offset="0%" style="stop-color:purple;stop-opacity:1" />
	<stop offset="100%" style="stop-color:white;stop-opacity:0" />
      </radialGradient>
      
      <filter id="glow">
	<feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
	<feMerge>
	  <feMergeNode in="blur" />
	  <feMergeNode in="SourceGraphic" />
	</feMerge>
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="black" />
    
    <!-- Animated electrical arcs (simplified representation) -->
    <path d="M0,200 Q400,100 800,200" stroke="cyan" stroke-width="2" fill="none">
      <animate attributeName="d" 
	       values="M0,200 Q400,100 800,200;M0,200 Q400,300 800,200;M0,200 Q400,100 800,200" 
	       dur="2s" repeatCount="indefinite" />
    </path>
    
    <!-- Fireballs (simplified) -->
    <circle cx="100" cy="300" r="20" fill="orange">
      <animate attributeName="cy" values="300;100;300" dur="3s" repeatCount="indefinite" />
    </circle>
    
    <!-- Ice spells (simplified) -->
    <polygon points="700,300 720,320 680,320" fill="lightblue">
      <animate attributeName="points" 
	       values="700,300 720,320 680,320;700,100 720,120 680,120;700,300 720,320 680,320" 
	       dur="4s" repeatCount="indefinite" />
    </polygon>
    
    <!-- The word "MAGIC" with sparkle effect -->
    <text x="400" y="200" font-family="Arial, sans-serif" font-size="80" fill="url(#sparkle)" 
	  text-anchor="middle" filter="url(#glow)">
      MAGIC
      <animate attributeName="font-size" values="80;85;80" dur="1s" repeatCount="indefinite" />
    </text>
    
    <!-- Additional sparkles around text (simplified) -->
    <g>
      <circle cx="300" cy="180" r="3" fill="white">
	<animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="500" cy="220" r="2" fill="white">
	<animate attributeName="opacity" values="0;1;0" dur="0.7s" repeatCount="indefinite" />
      </circle>
      <!-- Add more sparkles as needed -->
    </g>
  </svg>
`
