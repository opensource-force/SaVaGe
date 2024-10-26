(() => {
  let x = 0;
  let y = 0;

  let vX = {{vX}};
  let vY = {{vY}};

  if(typeof vX === 'string') {
    vX = 1;
  }
  if(typeof vY === 'string') {
    vY = 2;
  }

  let interval = {{interval}};
  if(typeof interval === 'string') {
    interval = 100;
  }

  const container = document.getElementById('js-animation') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }

console.log('vX', vX);
console.log('vY', vY);
console.log('interval', interval);

  setInterval(() => {
    x+= vX;
    y+= vY;
    const svg = `<svg width="400" height="500" style="background-color:#bff;">` +
    `<rect x="0" y="0" width="20" height="20" transform="translate(${x},${y})" />` +
    `</svg>`;
    container.innerHTML = svg;
  }, interval);
})();

