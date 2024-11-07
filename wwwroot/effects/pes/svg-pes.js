/*<!DOCTYPE html>
<html>
<head>
  <style>
    .particle-container {
      position: relative;
      width: 100%;
      height: 400px;
      background: #333;
      overflow: hidden;
    }
    .particle {
      position: absolute;
      opacity: 0;
    }
  </style>
</head>
<body>
  <div class="particle-container">
    <svg width="100%" height="100%" id="particleSvg">
      <defs>
        <!-- Motion path for particles -->
        <path id="motionPath" d="M 0,0 Q 35,0 70,0" fill="none" />
        
        <!-- Filter for colorizing the particles -->
        <filter id="colorize">
          <feColorMatrix type="matrix" values="1 0 0 0 0   0 1 0 0 0   0 0 1 0 0  0 0 0 1 0"/>
        </filter>
      </defs>
    </svg>
  </div>

  <script>*/
  (() => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    const container = document.getElementById('container') || document.createElement('div');
    if(!container.id) {
      container.setAttribute("style", `width:${400 + 'px'};height:${400 + 'px'};background-color: blue;`);
      document.body.appendChild(container);
    }
console.log('width and height', windowWidth, windowHeight);
 
    const emitterConfig = {{emitterConfig}}

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "emitterSVG" + (Math.floor(Math.random() * 10000)));
    svg.setAttribute("width", `${400}`);
    svg.setAttribute("height", `${400}`);
    svg.setAttribute("border-width", "2");

    const getViewBox = (x, y, vx, vy, ax, ay, lifetime) => {
      const maxX = x + (vx * lifetime) + ((1 / 2) * ax * (lifetime ^ 2));
      const maxY = y + (vy * lifetime) + ((1 / 2) * ay * (lifetime ^ 2));

      return `0 0 ${maxX} ${maxY}`;
    };

    svg.setAttribute("viewBox", getViewBox(
      Math.max(emitterConfig.minX, emitterConfig.maxX),
      Math.max(emitterConfig.minY, emitterConfig.maxY),
      Math.max(emitterConfig.minVX, emitterConfig.maxVX),
      Math.max(emitterConfig.minVY, emitterConfig.maxVY),
      Math.max(emitterConfig.minAX, emitterConfig.maxAX),
      Math.max(emitterConfig.minAY, emitterConfig.maxAY),
      Math.max(emitterConfig.maxLifetime)
    ));
    const backgroundColor = Math.random() < 0.5 ? (Math.random() < 0.5 ? 'green' : 'blue') : 'orange';
    svg.setAttribute("overflow", "hidden");
    svg.setAttribute("style", `background-color: ${backgroundColor};`);

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(defs);
    
    container.appendChild(svg);

    let particleCount = 0;

    const random = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    const createColorFilters = (startRGBA, endRGBA) => {
        const startFilterId = 'colorize_start' + Math.floor(Math.random() * 10000);
        const endFilterId = 'colorize_end' + Math.floor(Math.random() * 10000);

        const startFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        startFilter.setAttribute("id", startFilterId);

        const startColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        startColorMatrix.setAttribute("type", "matrix");
        startColorMatrix.setAttribute("values", "1 0 0 0 0   0 1 0 0 0   0 0 1 0 0  0 0 0 1 0");

        const startMatrix = `${random(startRGBA.minStartR, startRGBA.maxStartR)/255} 0 0 0 0   0 ${random(startRGBA.minStartG, startRGBA.maxStartG)/255} 0 0 0   0 0 ${random(startRGBA.minStartB, startRGBA.maxStartB)/255} 0 0   0 0 0 ${random(startRGBA.minStartA, startRGBA.maxStartA)/255} 0;${random(endRGBA.minEndR, endRGBA.maxEndR)/255} 0 0 0 0   0 ${random(endRGBA.minEndG, endRGBA.maxEndG)/255} 0 0 0   0 0 ${random(endRGBA.minEndB, endRGBA.maxEndB)/255} 0 0   0 0 0 ${random(endRGBA.minEndA, endRGBA.maxEndA)/255} 0;`;

        const endColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        endColorMatrix.setAttribute("attributeName", "values");
        endColorMatrix.setAttribute("dur", "1s");
        endColorMatrix.setAttribute("repeatCount", "1");
        endColorMatrix.setAttribute("values", startMatrix);

        startColorMatrix.appendChild(endColorMatrix);
        startFilter.appendChild(startColorMatrix);
        svg.querySelector("defs").appendChild(startFilter);

        return startFilterId;
      };

      // Create an SVG animation that follows physics
      const createPhysicsAnimation = (startX, startY, startVX, startVY, accelX, accelY, lifetimeMS, fps = 60) => {
          const lifetime = (lifetimeMS + 1) / 1000;

	  const frames = lifetime * fps;
	  const dt = lifetime / frames;
	  const points = [];

	  let x = Math.round(startX);
	  let y = Math.round(startY);
	  let vx = startVX;
	  let vy = startVY;
  
          points.push("M 0,0 ");

	  // Calculate position at each frame // come back HEREERERERER
	  for (let i = 0; i <= frames; i++) {
	      points.push(` L ${x},${y}`);
	      
	      // Update position
	      x += Math.round(vx * dt);
	      y += Math.round(vy * dt);
	      
emitterConfig.	      // Update velocity
              vx += accelX * dt;
	      vy += accelY * dt;
	  }

	  return points.join(' ');
      };


      const createParticle = () => {
        const particle = document.createElementNS("http://www.w3.org/2000/svg", "image");
        const lifetime = random(emitterConfig.minLifetime, emitterConfig.maxLifetime) * 1000; // Convert to ms
        
        const x = random(emitterConfig.minX, emitterConfig.maxX);
        const y = random(emitterConfig.minY, emitterConfig.maxY);
        
        particle.setAttributeNS("http://www.w3.org/1999/xlink", "href", emitterConfig.imageData);
        particle.setAttribute("width", "32");
        particle.setAttribute("height", "32");
        particle.setAttribute("x", x);
        particle.setAttribute("y", y);
        particle.setAttribute("fill", "green");

        const vx = random(emitterConfig.minVX, emitterConfig.maxVX);
        const vy = random(emitterConfig.minVY, emitterConfig.maxVY);

        const ax = random(emitterConfig.minAX, emitterConfig.maxAX);
        const ay = random(emitterConfig.minAY, emitterConfig.maxAY);

        const startFilterId = createColorFilters(emitterConfig.startRGBA, emitterConfig.endRGBA);
        
        particle.setAttribute("filter", `url(#${startFilterId})`);
        //particle.setAttribute("filter", `url(#${colorFilters.endFilterId})`);

        const path = createPhysicsAnimation(x, y, vx, vy, ax, ay, lifetime);
console.log(x, y, vx, vy, ax, ay, lifetime);

        const motionAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        
        motionAnimation.setAttribute("dur", `${lifetime}ms`);
        motionAnimation.setAttribute("repeatCount", "1");
        motionAnimation.setAttribute("path", `${path}`);

        const scaleAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      //  const startScale = random(emitterConfig.minStartScale, emitterConfig.maxStartScale) / 32;
        const startScale = random(emitterConfig.minStartScale, emitterConfig.maxStartScale);
        const endScale = random(emitterConfig.minEndScale, emitterConfig.maxEndScale) / 32;
        
        scaleAnimation.setAttribute("attributeName", "transform");
        scaleAnimation.setAttribute("type", "scale");
        scaleAnimation.setAttribute("from", startScale);
        scaleAnimation.setAttribute("to", endScale);
        scaleAnimation.setAttribute("dur", `${lifetime}ms`);
        scaleAnimation.setAttribute("repeatCount", "1");

        // Add animations to particle
        particle.appendChild(motionAnimation);
        particle.appendChild(scaleAnimation);

        // Add particle to SVG
        svg.appendChild(particle);
        particleCount++;

        // Remove particle and its filter when animation ends
        setTimeout(() => {
          svg.querySelector("defs").removeChild(
            document.getElementById(startFilterId)
          );
         /* svg.querySelector("defs").removeChild(
            document.getElementById(colorFilters.endFilterId)
          );*/

          svg.removeChild(particle);
          particleCount--;
        }, lifetime);
      };

      let running = true;

      const end = () => {
        running = false;
      };

      const start = () => {
svg.setAttribute("fill", "green");
        container.appendChild(svg);
        const emitParticle = () => {
          if (particleCount < emitterConfig.maxParticles) {
            createParticle();
          }
          if(running) {
            requestAnimationFrame(emitParticle);
          }
        };
        
        requestAnimationFrame(emitParticle);

	setTimeout(() => {
console.log('ending');
	  end();
	}, emitterConfig.maxLifetime * 1000);
      };

      window.onload = start;
  })();
/*  </script>
</body>
</html>*/
