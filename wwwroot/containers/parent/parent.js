(() => {
  const element = document.getElementById('{{parentElement}}');
  const svg = `{{contents}}`;

  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("id", "parentSVG");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("viewBox", "0 0 100 100");
  svgElement.setAttribute("preserveAspectRatio", "none");
 
  element.appendChild(svgElement);
  svgElement.innerHTML = svg;
})();
