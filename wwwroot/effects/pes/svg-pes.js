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
    const container = document.getElementById('osf-logo-container') || document.createElement('div');
    if(!container.id) {
      document.body.appendChild(container);
    }

    const emitterConfig = {{emitterConfig}}

    const random = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    const startFilterId = 'colorize_start';
    const endFilterId = 'colorize_end';

    const createColorFilters = (startRGBA, endRGBA) => {
        const startFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        const endFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        startFilter.setAttribute("id", startFilterId);
        endFilter.setAttribute("id", endFilterId);

        const startColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        startColorMatrix.setAttribute("type", "matrix");
        startColorMatrix.setAttribute("values", `
          ${random(startRGBA.minStartR, startRGBA.maxStartR)/255} 0 0 0 0
          0 ${random(startRGBA.minStartG, startRGBA.maxStartG)/255} 0 0 0
          0 0 ${random(startRGBA.minStartB, startRGBA.maxStartB)/255} 0 0
          0 0 0 ${random(startRGBA.minStartA, startRGBA.maxStartA)/255} 0
        `);

        const endColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        endColorMatrix.setAttribute("type", "matrix");
        endColorMatrix.setAttribute("values", `
          ${random(endRGBA.minEndR, endRGBA.maxEndR)/255} 0 0 0 0
          0 ${random(endRGBA.minEndG, endRGBA.maxEndG)/255} 0 0 0
          0 0 ${random(endRGBA.minEndB, endRGBA.maxEndB)/255} 0 0
          0 0 0 ${random(endRGBA.minEndA, endRGBA.maxEndA)/255} 0
        `);

        startFilter.appendChild(startColorMatrix);
        this.svg.querySelector("defs").appendChild(startFilter);
        endFilter.appendChild(endColorMatrix);
        this.svg.querySelector("defs").appendChild(endFilter);
      };

      // Create an SVG animation that follows physics
      const createPhysicsAnimation = (startX, startY, startVX, startVY, accelX, accelY, lifetime, fps = 60) {

	  const frames = lifetime * fps;
	  const dt = lifetime / frames;
	  const points = [];

	  let x = startX;
	  let y = startY;
	  let vx = startVX;
	  let vy = startVY;

	  // Calculate position at each frame // come back HEREERERERER
	  for (let i = 0; i <= frames; i++) {
	      points.push(`${x},${y}`);
	      
	      // Update position
	      x += vx * dt;
	      y += vy * dt;
	      
	      // Update velocity
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
        
        particle.setAttributeNS("http://www.w3.org/1999/xlink", "href", "/api/placeholder/32/32");
        particle.setAttribute("width", "32");
        particle.setAttribute("height", "32");
        particle.setAttribute("x", x);
        particle.setAttribute("y", y);

        const vx = random(emitterConfig.minVX, emitterConfig.maxVX);
        const vy = random(emitterConfig.minVY, emitterConfig.maxVY);

        const colorFilters = createColorFilter(emitterConfig.startRGBA, emitterConfig.endRGBA);
        
        particle.setAttribute("filter", `url(#${startFilterId})`);
        particle.setAttribute("filter", `url(#${endFilterId})`);

        const path = createPhysicsAnimation(x, y, vx, vy, accelX, accelY, lifetime);

        const motionAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        
        motionAnimation.setAttribute("dur", `${lifetime}ms`);
        motionAnimation.setAttribute("repeatCount", "1");
        motionAnimation.setAttribute("path", `M ${path}`);

        const scaleAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        const startScale = random(emitterConfig.minStartScale, emitterConfig.maxStartScale) / 32;
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
        particle.appendChild(opacityAnimation);

        // Add particle to SVG
        svg.appendChild(particle);
        activeParticles.add(particle);

        // Remove particle and its filter when animation ends
        setTimeout(() => {
          this.svg.querySelector("defs").removeChild(
            document.getElementById(startFilterId)
          );
          this.svg.removeChild(particle);
          this.activeParticles.delete(particle);
        }, lifetime);
      };

      const start = () => {
        const emitParticle = () => {
          if (activeParticles.length < emitterConfig.maxParticles) {
            createParticle();
          }
          requestAnimationFrame(emitParticle);
        };
        
        requestAnimationFrame(emitParticle);
      };

      window.onload = start;
  })();
/*  </script>
</body>
</html>*/
