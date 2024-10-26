(() => {
  const container = document.getElementById('{{buttonId}}') || document.createElement('div');
  if(!container.id) {
    container.id = 'button' + Math.floor(Math.random() * 10000);
    document.body.appendChild(container);
  }

  const svg = `{{contents}}`;

  container.innerHTML = svg;

  document.addEventListener('click', async () => {
    if((!event.target.closest('#{{buttonId}}')) && !event.target.closest(`#${container.id}`))) {
      return;
    }
    {{buttonOnClick}}
  });
})();

