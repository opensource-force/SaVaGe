<!DOCTYPE html>
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

  <script>
    const emitterConfig = {{emitterConfig}}

    const random = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    const createColorFilters = (startRGB, endRGB) => {
        const startFilterId = 'colorize_start';
        const endFilterId = 'colorize_end';
        const startFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        const endFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        startFilter.setAttribute("id", startFilterId);
        endFilter.setAttribute("id", endFilterId);

        const startColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        startColorMatrix.setAttribute("type", "matrix");
        startColorMatrix.setAttribute("values", `
          ${startRGB.r/255} 0 0 0 0
          0 ${startRGB.g/255} 0 0 0
          0 0 ${startRGB.b/255} 0 0
          0 0 0 1 0
        `);

        const endColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        endColorMatrix.setAttribute("type", "matrix");
        endColorMatrix.setAttribute("values", `
          ${endRGB.r/255} 0 0 0 0
          0 ${endRGB.g/255} 0 0 0
          0 0 ${endRGB.b/255} 0 0
          0 0 0 1 0
        `);

        startFilter.appendChild(startColorMatrix);
        this.svg.querySelector("defs").appendChild(startFilter);
        endFilter.appendChild(endColorMatrix);
        this.svg.querySelector("defs").appendChild(endFilter);
      };

      createParticle() {
        const particle = document.createElementNS("http://www.w3.org/2000/svg", "image");
        const lifetime = this.random(this.config.minLifetime, this.config.maxLifetime) * 1000; // Convert to ms
        
        // Initial position
        const x = this.random(this.config.minX, this.config.maxX);
        const y = this.random(this.config.minY, this.config.maxY);
        
        // Set basic attributes
        particle.setAttributeNS("http://www.w3.org/1999/xlink", "href", "/api/placeholder/32/32");
        particle.setAttribute("width", "32");
        particle.setAttribute("height", "32");
        particle.setAttribute("x", x);
        particle.setAttribute("y", y);

        // Create color filters
        const startFilterId = this.createColorFilter(
          this.random(this.config.minR, this.config.maxR),
          this.random(this.config.minG, this.config.maxG),
          this.random(this.config.minB, this.config.maxB)
        );
        
        // Apply initial color filter
        particle.setAttribute("filter", `url(#${startFilterId})`);

        // Create animations
        const motionAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
        const vx = this.random(this.config.minVX, this.config.maxVX);
        const vy = this.random(this.config.minVY, this.config.maxVY);
        const distance = vx * (lifetime / 1000);
        
        motionAnimation.setAttribute("dur", `${lifetime}ms`);
        motionAnimation.setAttribute("repeatCount", "1");
        motionAnimation.setAttribute("path", `M 0,0 L ${distance},${vy * (lifetime / 1000)}`);

        // Scale animation
        const scaleAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        const startScale = this.random(this.config.minStartScale, this.config.maxStartScale) / 32;
        const endScale = this.random(this.config.minEndScale, this.config.maxEndScale) / 32;
        
        scaleAnimation.setAttribute("attributeName", "transform");
        scaleAnimation.setAttribute("type", "scale");
        scaleAnimation.setAttribute("from", startScale);
        scaleAnimation.setAttribute("to", endScale);
        scaleAnimation.setAttribute("dur", `${lifetime}ms`);
        scaleAnimation.setAttribute("repeatCount", "1");

        // Opacity animation
        const opacityAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        opacityAnimation.setAttribute("attributeName", "opacity");
        opacityAnimation.setAttribute("from", "1");
        opacityAnimation.setAttribute("to", "0");
        opacityAnimation.setAttribute("dur", `${lifetime}ms`);
        opacityAnimation.setAttribute("repeatCount", "1");

        // Add animations to particle
        particle.appendChild(motionAnimation);
        particle.appendChild(scaleAnimation);
        particle.appendChild(opacityAnimation);

        // Add particle to SVG
        this.svg.appendChild(particle);
        this.activeParticles.add(particle);

        // Remove particle and its filter when animation ends
        setTimeout(() => {
          this.svg.querySelector("defs").removeChild(
            document.getElementById(startFilterId)
          );
          this.svg.removeChild(particle);
          this.activeParticles.delete(particle);
        }, lifetime);
      }

      start() {
        const emitParticle = () => {
          if (this.activeParticles.size < this.config.maxParticles) {
            this.createParticle();
          }
          requestAnimationFrame(emitParticle);
        };
        
        requestAnimationFrame(emitParticle);
      }

    // Start the animation
    const animator = new ParticleSVGAnimator(emitterConfig, "particleSvg");
    animator.start();
  </script>
</body>
</html>
