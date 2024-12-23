  (() => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    const containerId = 'top-layer';
    const container = document.getElementById('top-layer') || document.createElement('div');
    container.id = containerId;
    container.style = `position:fixed;z-index:9999;width:100vw;height:100vh;`;
 
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
    svg.setAttribute("viewBox", "0 0 1600 800");

    const backgroundColor = Math.random() < 0.5 ? (Math.random() < 0.5 ? 'green' : 'blue') : 'orange';
    //svg.setAttribute("overflow", "hidden");
    //svg.setAttribute("style", `background-color: ${backgroundColor};`);

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(defs);
    
    let particleCount = 0;

    const random = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    const createColorFilters = (startRGBA, endRGBA, lifetime, begin) => {
        const startFilterId = 'colorize_start' + Math.floor(Math.random() * 10000);
        const endFilterId = 'colorize_end' + Math.floor(Math.random() * 10000);

        const startFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        startFilter.setAttribute("id", startFilterId);

        const startR = random(startRGBA.minStartR, startRGBA.maxStartR) / 255;
	const startG = random(startRGBA.minStartG, startRGBA.maxStartG) / 255;
	const startB = random(startRGBA.minStartB, startRGBA.maxStartB) / 255;
	const startA = random(startRGBA.minStartA, startRGBA.maxStartA) / 255;
	
	const endR = random(endRGBA.minEndR, endRGBA.maxEndR) / 255;
	const endG = random(endRGBA.minEndG, endRGBA.maxEndG) / 255;
	const endB = random(endRGBA.minEndB, endRGBA.maxEndB) / 255;
	const endA = random(endRGBA.minEndA, endRGBA.maxEndA) / 255;

        const startColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        startColorMatrix.setAttribute("type", "matrix");

        const startValues = `
	  ${startR} 0 0 0 0
	  0 ${startG} 0 0 0
	  0 0 ${startB} 0 0
	  0 0 0 ${startA} 0`;
        
        const endValues = `
	  ${endR} 0 0 0 0
	  0 ${endG} 0 0 0
	  0 0 ${endB} 0 0
	  0 0 0 ${endA} 0`;

        startColorMatrix.setAttribute("values", startValues);

        const animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
	animation.setAttribute("attributeName", "values");
	animation.setAttribute("from", startValues);
	animation.setAttribute("to", endValues);
	animation.setAttribute("dur", `${lifetime}ms`);
	animation.setAttribute("begin", `${begin}ms`);  
	animation.setAttribute("repeatCount", "1");
	animation.setAttribute("fill", "freeze");

        startColorMatrix.appendChild(animation);
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

      const startTime = new Date().getTime();

      const createParticle = (emitter) => {
        const particle = document.createElementNS("http://www.w3.org/2000/svg", "image");
        const lifetime = random(emitter.minLifetime, emitter.maxLifetime) * 1000; // Convert to ms
        const begin = new Date().getTime() - startTime;
        let animationCount = 0;
        const totalAnimations = 3;

        const screenPositionX = emitter.screenPositionX;
        const screenPositionY = emitter.screenPositionY;
console.log('screenPositionX', screenPositionX);
        
        const x = random(emitter.minX, emitter.maxX) + screenPositionX;
        const y = random(emitter.minY, emitter.maxY) + screenPositionY;
        
        particle.setAttributeNS("http://www.w3.org/1999/xlink", "href", emitter.imageData);
        particle.setAttribute("width", "32");
        particle.setAttribute("height", "32");
        particle.setAttribute("x", 0);
        particle.setAttribute("y", 0);
        particle.setAttribute("opacity", "0");

        const vx = random(emitter.minVX, emitter.maxVX);
        const vy = random(emitter.minVY, emitter.maxVY);

        const ax = random(emitter.minAX, emitter.maxAX);
        const ay = random(emitter.minAY, emitter.maxAY);

        const startFilterId = createColorFilters(emitter.startRGBA, emitter.endRGBA, lifetime, begin);
        
        particle.setAttribute("filter", `url(#${startFilterId})`);

        const path = createPhysicsAnimation(x, y, vx, vy, ax, ay, lifetime);

        const removeParticle = () => {
	  animationCount++;

	  if (animationCount >= totalAnimations) {
console.log('removing particle because of animation count');
	    svg.removeChild(particle);
	    svg.querySelector("defs").removeChild(
	      document.getElementById(startFilterId)
	    );
            particleCount--;
	  }
        };

        setTimeout(() => {
          if(particle.parentNode) {
console.log('removing particle because of timeout', lifetime);
            svg.removeChild(particle);
	    svg.querySelector("defs").removeChild(
	      document.getElementById(startFilterId)
	    );
	    particleCount--;
          }
        }, lifetime + 50000);

        const motionAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        
        motionAnimation.setAttribute("dur", `${lifetime}ms`);
        motionAnimation.setAttribute("repeatCount", "1");
        motionAnimation.setAttribute("path", `${path}`);
        motionAnimation.setAttribute("begin", `${begin}ms`);
        motionAnimation.setAttribute("fill", "freeze");
        motionAnimation.addEventListener('endEvent', removeParticle);

      
        const widthAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        const heightAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        const startScale = random(emitter.minStartScale, emitter.maxStartScale);
        const endScale = random(emitter.minEndScale, emitter.maxEndScale);
        
        widthAnimation.setAttribute("attributeName", "width");
        widthAnimation.setAttribute("from", startScale);
        widthAnimation.setAttribute("to", endScale);
        widthAnimation.setAttribute("dur", `${lifetime}ms`);
        widthAnimation.setAttribute("repeatCount", "1");
        widthAnimation.setAttribute("begin", `${begin}ms`);
        widthAnimation.setAttribute("fill", "freeze");
        widthAnimation.addEventListener('endEvent', removeParticle);

        heightAnimation.setAttribute("attributeName", "height");
        heightAnimation.setAttribute("from", startScale);
        heightAnimation.setAttribute("to", endScale);
        heightAnimation.setAttribute("dur", `${lifetime}ms`);
        heightAnimation.setAttribute("repeatCount", "1");
        heightAnimation.setAttribute("begin", `${begin}ms`);
        heightAnimation.setAttribute("fill", "freeze");
        heightAnimation.addEventListener('endEvent', removeParticle);

        const opacityAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        opacityAnimation.setAttribute("attributeName", "opacity");
        opacityAnimation.setAttribute("from", "0");
        opacityAnimation.setAttribute("to", "1");
        opacityAnimation.setAttribute("dur", "0.001s");
        opacityAnimation.setAttribute("begin", `${begin}ms`);
        opacityAnimation.setAttribute("fill", "freeze");

        particle.appendChild(motionAnimation);
        particle.appendChild(widthAnimation);
        particle.appendChild(heightAnimation);
        particle.appendChild(opacityAnimation);

console.log('trying to append particle to svg.id', svg.id);
        svg.appendChild(particle);
        particleCount++;
      };

      let running = true;


      const end = () => {
        running = false;
      };

      const start = (emitter) => {
        if(!document.getElementById(container.id)) {
          document.body.appendChild(container);
        }

        svg = document.getElementById('emitterSVG');

        const emitParticle = () => {
          if (particleCount < emitter.maxParticles) {
            createParticle(emitter);
          }
          if(running) {
            requestAnimationFrame(emitParticle);
          }
        };
        
        requestAnimationFrame(emitParticle);

	setTimeout(() => {
console.log('calling end after ' + (emitter.duration || emitter.maxLifetime * 1000));
	  end();
	}, (emitter.duration || emitter.maxLifetime * 1000));
      };

/*      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', start);
      } else {
	start();
      }*/

      window.deployEmitter = emitter => start(emitter);
  })();
