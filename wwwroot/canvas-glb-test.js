(() => {
  const emojis = ["😹", "🦑", "🔥"];

  const generateParticle = () => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const positionX = Math.random() < 0.5 ? -1 * Math.floor(Math.random() * 30) : Math.floor(Math.random() * 30);
    const positionY = Math.floor(Math.random() * 100);
    const velocityX = Math.random() < 0.5 ? Math.random() < 0.5 ? -2 : 2 : Math.random() < 0.5 ? -1 : 1;
    const velocityY = Math.ceil(Math.random() * -5);

console.log(positionX);

    return {
      emoji,
      positionX,
      positionY,
      velocityX,
      velocityY,
    };
  };

  const container = document.getElementById('canvas-test') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
    {{contents}}
  </svg>`;

  container.innerHTML = svg;

  let particles = [generateParticle(), generateParticle()];

  const updateParticles = (particlesToUpdate) => {
    particlesToUpdate = [...particlesToUpdate, generateParticle()];
    return particlesToUpdate.map(particle => {
      particle.positionX += particle.velocityX;
      particle.positionY += particle.velocityY;
      return particle;
    }).filter(particle => particle.positionX < 65 && particle.positionX > -5 && particle.positionY > -5);
  };

console.log('this gets read at least');

  setInterval(() => {
    const canvas = document.getElementById('{{canvasId}}');
    particles = updateParticles(particles);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, {{canvasWidth}}, {{canvasHeight}});
    context.fillStyle = '#233445';
    context.fillRect(0, 0, 60, 100);
    context.fillStyle = 'black';
    
    particles.forEach(particle => {
console.log(particle.positionX);
      context.fillText(particle.emoji, particle.positionX, particle.positionY);
    });
  }, 33);
})();

