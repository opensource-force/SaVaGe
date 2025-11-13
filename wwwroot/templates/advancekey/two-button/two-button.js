(() => {
  const containerId = '{{containerId}}' || 'advancekey-two-button';
  const container = document.getElementById(containerId) || document.createElement('div');

  if (!container.id) {
    container.id = containerId;
    document.body.appendChild(container);
  }

  const svg = `{{contents}}`;
  container.innerHTML = svg;

  // Setup button click handlers
  const button1 = document.getElementById('button1');
  const button2 = document.getElementById('button2');

  const handleButtonClick = (e) => {
    const spell = e.target.getAttribute('data-spell');
    const spellComponent = e.target.getAttribute('data-spell-component');

    console.log('ADVANCEKEY: Button clicked', { spell, spellComponent });

    // For AdvanceKey: Post message to Swift
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.spellCast) {
      window.webkit.messageHandlers.spellCast.postMessage({
        spell: spell,
        spellComponent: spellComponent,
        timestamp: Date.now()
      });
    }

    // Fallback: Dispatch custom event
    window.dispatchEvent(new CustomEvent('advancekey-spell-cast', {
      detail: { spell, spellComponent }
    }));
  };

  if (button1) {
    button1.addEventListener('click', handleButtonClick);
  }

  if (button2) {
    button2.addEventListener('click', handleButtonClick);
  }
})();
