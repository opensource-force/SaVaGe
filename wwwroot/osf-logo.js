(() => {
  const container = document.getElementById('osf-logo-container') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }


  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
    {{contents}}
  </svg>`;

  container.innerHTML = svg;
 
})();
