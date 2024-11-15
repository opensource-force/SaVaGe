(() => {
  const container = document.getElementById('{{containerId}}') || document.createElement('div');
  if(!container.id) {
    container.id = '{{containerId}}';
    document.body.appendChild(container);
  }
  const svg = `{{contents}}`;

  const parser = new DOMParser();
  const element = parser.parseFromString(svg, 'image/svg+xml');
console.log('element', element);
  const domElement = element.documentElement;
console.log('domElement', domElement);
  domElement.setAttribute("id", "planetNineMonitor");

  const onResize = () => {
    container.removeChild(domElement);
    container.appendChild(domElement);
  };

  const parent = container.parentElement;

  parent.removeChild(container);
  container.appendChild(domElement);
  parent.appendChild(container);
})();
