(() => {
  const emojis = ["😹", "🦑", "🔥"];
  const maxX = 400;
  const maxY = 400;

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  const onResize = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    document.getElementById('fullSVG').setAttribute('viewBox', `0 0 ${windowWidth} ${windowHeight}`);

    const canvas = document.getElementById('{{canvasId}}');
    canvas.width = windowWidth;
    canvas.height = windowHeight;
console.log('canvas width should now be', canvas.width, windowWidth);
  };

  window.addEventListener('resize', onResize);

  const generateParticle = () => {
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

  const container = document.getElementById('svgContainer') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }

  let svg = `{{contents}}`;

  svg = svg.replace('{window.innerWidth}', windowWidth);
  svg = svg.replace('{window.innerHeight}', windowHeight);

  container.innerHTML = svg;

  let particles = [generateParticle(), generateParticle()];

  const updateParticles = (particlesToUpdate) => {
    particlesToUpdate = [...particlesToUpdate, generateParticle()];
    return particlesToUpdate.map(particle => {
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

