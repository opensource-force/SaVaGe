  (() => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    const containerId = 'savage';
    const container = document.getElementById('savage') || document.createElement('div');
    container.id = containerId;
    container.style = `width:${windowWidth}px;height:${windowHeight}px;`;
 
    const emitterConfig = {{emitterConfig}}

    let svg = document.getElementById("emitterSVG") || document.createElementNS("http://www.w3.org/2000/svg", "svg");

    if(!svg.id) {
      container.appendChild(svg);
      svg.setAttribute("id", "emitterSVG");
    }

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("border-width", "2");

    // The container, and this viewBox will likely end up being the same for all game scenes, but
    // since this is the furthest along, we'll leave it as is for now.
    svg.setAttribute("viewBox", "0 0 1200 500");

    const backgroundColor = Math.random() < 0.5 ? (Math.random() < 0.5 ? 'green' : 'blue') : 'orange';
    svg.setAttribute("overflow", "hidden");
    svg.setAttribute("style", `background-color: ${backgroundColor};`);

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(defs);
    
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

      // Right now this just handles linear motion. I think the plan is to add more Physics as
      // needed in small chunks. 
      const createPhysicsAnimation = (startX, startY, startVX, startVY, accelX, accelY, lifetimeMS, fps = 60) => {
          const lifetime = (lifetimeMS) / 1000;

	  const frames = lifetime * fps;
	  const dt = lifetime / frames;
	  const points = [];

	  let x = Math.round(startX);
	  let y = Math.round(startY);
	  let vx = startVX;
	  let vy = startVY;
  
          points.push(`M ${x},${y} `);

	  for (let i = 0; i <= frames; i++) {
	      points.push(` L ${x},${y}`);
	      
	      x += Math.round(vx * dt);
	      y += Math.round(vy * dt);
	      
              vx += accelX * dt;
	      vy += accelY * dt;
	  }

	  return points.join(' ');
      };


      const createParticle = () => {
        const particle = document.createElementNS("http://www.w3.org/2000/svg", "image");
        const lifetime = random(emitterConfig.minLifetime, emitterConfig.maxLifetime) * 1000; // Convert to ms
        let animationCount = 0;
        const totalAnimations = 3;
        
        const x = random(emitterConfig.minX, emitterConfig.maxX);
        const y = random(emitterConfig.minY, emitterConfig.maxY);
        
        particle.setAttributeNS("http://www.w3.org/1999/xlink", "href", emitterConfig.imageData);
        particle.setAttribute("width", "32");
        particle.setAttribute("height", "32");
        particle.setAttribute("x", 0);
        particle.setAttribute("y", 0);
        particle.setAttribute("opacity", "0");
        particle.setAttribute("fill", "green");

        const vx = random(emitterConfig.minVX, emitterConfig.maxVX);
        const vy = random(emitterConfig.minVY, emitterConfig.maxVY);

        const ax = random(emitterConfig.minAX, emitterConfig.maxAX);
        const ay = random(emitterConfig.minAY, emitterConfig.maxAY);

        const startFilterId = createColorFilters(emitterConfig.startRGBA, emitterConfig.endRGBA);
        
        particle.setAttribute("filter", `url(#${startFilterId})`);

        const path = createPhysicsAnimation(x, y, vx, vy, ax, ay, lifetime);

        const removeParticle = () => {
	  animationCount++;

	  if (animationCount >= totalAnimations) {
	    svg.removeChild(particle);
	    svg.querySelector("defs").removeChild(
	      document.getElementById(startFilterId)
	    );
            particleCount--;
	  }
        };

        setTimeout(() => {
          svg.removeChild(particle);
	  svg.querySelector("defs").removeChild(
	    document.getElementById(startFilterId)
	  );
	  particleCount--;
        }, lifetime + 50);

        const motionAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        
        motionAnimation.setAttribute("dur", `${lifetime}ms`);
        motionAnimation.setAttribute("repeatCount", "1");
        motionAnimation.setAttribute("path", `${path}`);
        motionAnimation.setAttribute("fill", "freeze");
        motionAnimation.addEventListener('endEvent', removeParticle);

      
        const widthAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        const heightAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        const startScale = random(emitterConfig.minStartScale, emitterConfig.maxStartScale);
        const endScale = random(emitterConfig.minEndScale, emitterConfig.maxEndScale);
        
        widthAnimation.setAttribute("attributeName", "width");
        widthAnimation.setAttribute("from", startScale);
        widthAnimation.setAttribute("to", endScale);
        widthAnimation.setAttribute("dur", `${lifetime}ms`);
        widthAnimation.setAttribute("repeatCount", "1");
        widthAnimation.setAttribute("fill", "freeze");
        widthAnimation.addEventListener('endEvent', removeParticle);

        heightAnimation.setAttribute("attributeName", "height");
        heightAnimation.setAttribute("from", startScale);
        heightAnimation.setAttribute("to", endScale);
        heightAnimation.setAttribute("dur", `${lifetime}ms`);
        heightAnimation.setAttribute("repeatCount", "1");
        heightAnimation.setAttribute("fill", "freeze");
        heightAnimation.addEventListener('endEvent', removeParticle);

        const opacityAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        opacityAnimation.setAttribute("attributeName", "opacity");
        opacityAnimation.setAttribute("from", "0");
        opacityAnimation.setAttribute("to", "1");
        opacityAnimation.setAttribute("dur", "0.001s");
        opacityAnimation.setAttribute("begin", "0s");
        opacityAnimation.setAttribute("fill", "freeze");

        // Add animations to particle
        particle.appendChild(motionAnimation);
        particle.appendChild(widthAnimation);
        particle.appendChild(heightAnimation);
        particle.appendChild(opacityAnimation);

        // Add particle to SVG
console.log('trying to append particle to svg.id', svg.id);
        svg.appendChild(particle);
        particleCount++;
      };

      let running = true;

      const end = () => {
        running = false;
      };

      const start = () => {
        if(!document.getElementById(container.id)) {
          document.body.appendChild(container);
        }

        svg = document.getElementById('emitterSVG');

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
	  end();
	}, emitterConfig.maxLifetime * 1000);
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
      } else {
	  start();
      }
  })();
