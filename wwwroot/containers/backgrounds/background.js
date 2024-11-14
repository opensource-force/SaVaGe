(() => {
  const container = document.getElementById('background') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
    document.body.setAttribute('id', 'background');
  }

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  container.style = `width:${windowWidth}px;height:${windowHeight}px;`;

  const onResize = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    container.style = `width:${windowWidth}px;height:${windowHeight}px;`;
  };

  container.innerHTML = `{{contents}}`;
})();
