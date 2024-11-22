(() => {
  const container = document.getElementById('{{containerId}}') || document.createElement('div');
  if(!container.id) {
    container.id = '{{containerId}}';
    document.body.appendChild(container);
  }
  const svg = `{{contents}}`;

  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("id", "dialog-{{containerId}}");
  svgElement.setAttribute("width", "{{width}}");
  svgElement.setAttribute("height", "{{height}}");
  svgElement.setAttribute("viewBox", "0 0 {{width}} {{height}}");
  svgElement.setAttribute("preserveAspectRatio", "none");
 
  container.appendChild(svgElement);
  svgElement.innerHTML = svg;
})();
