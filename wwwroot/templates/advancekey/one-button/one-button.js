(() => {
  const containerId = '{{containerId}}' || 'advancekey-one-button';
  const container = document.getElementById(containerId) || document.createElement('div');

  if (!container.id) {
    container.id = containerId;
    document.body.appendChild(container);
  }

  const svg = `{{contents}}`;
  container.innerHTML = svg;

  // Setup button click handler
  const button1 = document.getElementById('button1');

  if (button1) {
    button1.addEventListener('click', (e) => {
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
    });
  }
})();
