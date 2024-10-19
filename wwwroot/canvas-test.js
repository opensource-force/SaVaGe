(() => {
  const colors = ["#dd0000", "green", "#0000dd"];

  const container = document.getElementById('canvas-test') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
    {{contents}}
  </svg>`;

  container.innerHTML = svg;

  let colorIndex = 0;

  setInterval(() => {
    const color = colors[colorIndex];
    colorIndex++;
    if(colorIndex >= colors.length) {
      colorIndex = 0;
    }
    const canvas = document.getElementById('{{canvasId}}');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, {{canvasWidth}}, {{canvasHeight}});
    context.fillStyle = color;
    context.fillRect(0, 0, {{canvasWidth}}, {{canvasHeight}});
  }, 500);
})();
