(() => {
  const container = document.getElementById('metallic-badge-showcase') || document.createElement('div');
  if(!container.id) {
    container.id = 'metallic-badge-showcase';
    document.body.appendChild(container);
  }

  container.style.cssText = 'width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; background: #1a1a1a; margin: 0; padding: 0;';

  const svg = `{{contents}}`;

  container.innerHTML = svg;
})();
