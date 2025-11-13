(() => {
  const container = document.getElementById('gradient-sunset-showcase') || document.createElement('div');
  if(!container.id) {
    container.id = 'gradient-sunset-showcase';
    document.body.appendChild(container);
  }

  container.style.cssText = 'width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; margin: 0; padding: 0; overflow: hidden;';

  const svg = `{{contents}}`;

  container.innerHTML = svg;
})();
