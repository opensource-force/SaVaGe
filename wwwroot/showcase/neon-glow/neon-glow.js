(() => {
  const container = document.getElementById('neon-glow-showcase') || document.createElement('div');
  if(!container.id) {
    container.id = 'neon-glow-showcase';
    document.body.appendChild(container);
  }

  container.style.cssText = 'width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; background: #0a0a0a; margin: 0; padding: 0;';

  const svg = `{{contents}}`;

  container.innerHTML = svg;
})();
