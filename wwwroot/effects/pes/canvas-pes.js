(() => {
// We need to be able to pass in images, text, emojis, and maybe draw commands?
//  const emojis = ["😹", "🦑", "🔥"];
  const possibleParticles = {{possibleParticles}};
  const particles = possibleParticles.map(particle => {
      if(particle.slice(0, 4) === "img:") {
        const canvas1 = document.createElement('canvas');
	canvas1.width = img.width;
	canvas1.height = img.height;
	const ctx1 = canvas1.getContext('2d');

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
	  ctx1.drawImage(img, 0, 0);
        }
        img.src = particle.split(':')[1];
        return ctx1;
      }
     
      // Convert image loading to async/await
      await new Promise((resolve, reject) => {
	  img.onload = resolve;
	  img.onerror = () => reject(new Error('Failed to load image'));
	  img.src = imagePath;
      });
      
      // Create first canvas
      const canvas1 = document.createElement('canvas');
      canvas1.width = img.width;
      canvas1.height = img.height;
      const ctx1 = canvas1.getContext('2d');
      
      // Draw image to first canvas
      ctx1.drawImage(img, 0, 0);
      
      // Get pixel data
      const imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
      
      // Create second canvas
      const canvas2 = document.createElement('canvas');
      canvas2.width = img.width;
      canvas2.height = img.height;
      const ctx2 = canvas2.getContext('2d');
      
      // Put pixel data on second canvas
      ctx2.putImageData(imageData, 0, 0);
      
      return ctx2;
  }

  // Example usage:
  /*
  async function displayImage() {
      try {
	  // Process the image
	  const finalContext = await processImageThroughCanvas('path/to/image.jpg');
	  
	  // Draw to display canvas
	  const displayCanvas = document.getElementById('displayCanvas');
	  const displayCtx = displayCanvas.getContext('2d');
	  displayCtx.drawImage(finalContext.canvas, 0, 0);
      } catch (error) {
	  console.error('Error processing image:', error);
      }
  }

  // Call the function
  displayImage();
  */
  });

// the size of the canvas
  const maxX = {{maxX}};
  const maxY = {{maxY}};

  const parentSVGId = 'canvasSVG' + Math.floor(Math.random() * 10000);

  const onResize = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    const parentSVG = document.getElementById(parentSVGId);

    const canvas = document.getElementById('{{canvasId}}');
    canvas.width = parentSVG.width;
    canvas.height = parentSVG.height;
console.log('canvas width should now be', canvas.width, windowWidth);
  };

  const maxParticles = {{maxParticles}};
  const minLifetime = {{minLifetime}};
  const maxLifetime = {{maxLifetime}};
  
  const positionRange = {
    minX: {{positionMinX}},
    minY: {{positionMinY}},
    maxX: {{positionMaxX}},
    maxY: {{positionMaxY}}
  };

  const velocityRange = {
    minVX: {{minimumVelX}},
    minVY: {{minimumVelY}},
    maxVX: {{maximumVelX}},
    maxVY: {{maximumVelY}}
  };

  const accelerationRange = {
    minAX: {{minimumAccX}},
    minAY: {{minimumAccY}},
    maxAX: {{maximumAccX}},
    maxAY: {{maximumAccY}}
  };

  const scaleRange = {
    minStart: {{minStartScale}},
    maxStart: {{maxStartScale}},
    minEnd: {{minEndScale}},
    maxEnd: {{maxEndScale}}
  };

  const

  // There are many more properties that can be added such as angular velocity or collision effects
  // Those are left for when we need them

  const generateParticle = () => {
    // redo all this

    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const positionX = Math.random() < 0.5 ? -1 * Math.floor(Math.random() * (maxX / 2)) : Math.floor(Math.random() * (maxX / 2));
    const positionY = Math.floor(Math.random() * maxY);
    const velocityX = Math.random() < 0.5 ? Math.random() < 0.5 ? -2 : 2 : Math.random() < 0.5 ? -1 : 1;
    const velocityY = Math.ceil(Math.random() * -5);

    return {
      emoji,
      positionX,
      positionY,
      velocityX,
      velocityY,
    };
  };

  // Redo this too
  const container = document.getElementById('svgContainer') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }

  let svg = `{{contents}}`;

  container.innerHTML = svg;

  let particles = [generateParticle(), generateParticle()];

  const updateParticles = (particlesToUpdate) => {
    particlesToUpdate = [...particlesToUpdate, generateParticle()];
    return particlesToUpdate.map(particle => {
      particle.velocityX += particle.accelerationX;
      particle.velocityY += particle.accelerationY;
      particle.positionX += particle.velocityX;
      particle.positionY += particle.velocityY;
      return particle;
    }).filter(particle => particle.positionX < maxX + 5 && particle.positionX > -5 && particle.positionY > -5);
  };

  setInterval(() => {
    const canvas = document.getElementById('{{canvasId}}');
    particles = updateParticles(particles);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, windowWidth, windowHeight);
    context.fillStyle = '#233445';
    context.fillRect(0, 0, windowWidth, windowHeight);
    context.fillStyle = 'black';
    
    particles.forEach(particle => {
      context.fillText(particle.emoji, particle.positionX, particle.positionY);
    });
  }, 33);
})();

