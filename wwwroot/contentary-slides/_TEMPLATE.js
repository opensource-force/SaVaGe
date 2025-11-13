(() => {
  const container = document.getElementById('contentary-slide') || document.createElement('div');
  if(!container.id) {
    container.id = 'contentary-slide';
    document.body.appendChild(container);
  }

  container.style.cssText = 'width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; background: #000; margin: 0; padding: 0; overflow: hidden;';

  const svg = `{{contents}}`;

  container.innerHTML = svg;

  // Make it responsive while maintaining aspect ratio
  const svgElement = container.querySelector('svg');
  if (svgElement) {
    svgElement.style.cssText = 'max-width: 100%; max-height: 100vh; width: auto; height: auto;';
  }
})();
