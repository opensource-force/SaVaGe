(() => {
  const container = document.getElementById('savage') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }
  
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  
  const updateSVG = () => {
    const svg = `{{contents}}`;
    return svg;
  };

  let svg = updateSVG();

  const onResize = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    svg = updateSVG();

    container.innerHTML = svg;
  };

  window.addEventListener('resize', onResize);

  container.innerHTML = svg;
 
})();
