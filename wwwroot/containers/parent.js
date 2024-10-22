(() => {
  const element = document.getElementById('{{parentElement}}');
console.log('got element', element);
  const svg = `{{contents}}`;
console.log('got svg', svg);
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("id", "parentSVG");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");
  svgElement.setAttribute("viewBox", "0 0 100 100");
  svgElement.setAttribute("preserveAspectRatio", "none");
 
  element.appendChild(svgElement);
//  element.appendChild(svg);

//  const parser = new DOMParser();
//  const doc = parser.parseFromString(svg, 'image/svg+xml');
//  svgElement = doc.documentElement;
//  element.appendChild(svgElement);

  svgElement.innerHTML = svg;
//  svgElement.outerHTML = svg;
})();
