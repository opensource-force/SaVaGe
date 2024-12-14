(() => {
  const container = document.getElementById('{{containerId}}') || document.createElement('div');
  if(!container.id) {
    container.id = 'button' + Math.floor(Math.random() * 10000);
    document.body.appendChild(container);
  }

  const svg = `{{contents}}`;

  const parser = new DOMParser();
  const element = parser.parseFromString(svg, 'image/svg+xml');
  const domElement = element.documentElement;
  domElement.setAttribute("id", "{{buttonId}}");

  container.appendChild(domElement);
})();

