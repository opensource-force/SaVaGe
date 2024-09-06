(() => {
  let x = 0;
  let y = 0;

  setInterval(() => {
    x++;
    y++;
    const svg = `<svg width="400" height="500" style="background-color:#bff;">` +
    `<rect x="0" y="0" width="20" height="20" transform="translate(${x},${y})" />` +
    `</svg>`;
    const container = document.getElementById('osf-logo-container').innerHTML = svg;
  }, 100);
})();

