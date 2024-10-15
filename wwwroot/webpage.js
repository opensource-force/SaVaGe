(() => {
  const container = document.getElementById('osf-logo-container') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }

  let svg = `{{backgroundSVG}}`;
 
  container.innerHTML = svg;
 
})();
