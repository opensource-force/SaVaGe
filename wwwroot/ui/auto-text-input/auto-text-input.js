(() => {
  const container = document.getElementById('{{containerId}}') || document.createElement('div');
  if (!container.id) {
    container.id = 'autoTextInput' + Math.floor(Math.random() * 10000);
    document.body.appendChild(container);
  }

  // Character width mappings for monospace font at 18px
  // Will be updated with actual measurements after font loads
  const charWidths = {
    // Narrow characters
    ' ': 10.8, 'i': 10.8, 'l': 10.8, '1': 10.8, '!': 10.8, '|': 10.8, 'I': 10.8,
    // Wide characters (in some fonts these might be wider)
    'm': 10.8, 'w': 10.8, 'M': 10.8, 'W': 10.8,
    // Special characters
    '.': 10.8, ',': 10.8, ':': 10.8, ';': 10.8,
    // Default for monospace - all should be the same width
    default: 10.8
  };

  // Get width of a character
  const getCharWidth = (char) => charWidths[char] || charWidths.default;

  // Calculate total width needed for text
  const calculateTextWidth = (text) => {
    let width = 0;
    for (let char of text) {
      width += getCharWidth(char);
    }
    // Add padding
    return Math.max(width + 40, 120); // Minimum width of 120
  };

  // Smooth resize function using CSS transitions
  const resizeInput = (newWidth) => {
    const bg = container.querySelector('#inputBg{{id}}');
    const border = container.querySelector('#inputBorder{{id}}');
    const innerShadow = container.querySelector('#inputBorder{{id}} + rect');
    const svg = container.querySelector('svg');
    
    if (bg && border && svg) {
      // Update viewBox
      svg.setAttribute('viewBox', `0 0 ${newWidth + 4} 60`);
      
      // Animate width changes
      bg.setAttribute('width', newWidth);
      border.setAttribute('width', newWidth);
      if (innerShadow) {
        innerShadow.setAttribute('width', newWidth - 4);
      }
    }
  };

  // Update cursor position
  const updateCursorPosition = (text) => {
    const cursor = container.querySelector('#cursor{{id}}');
    const textElement = container.querySelector('#displayText{{id}}');
    
    if (cursor && textElement) {
      const textWidth = calculateTextWidth(text) - 40; // Remove padding
      const cursorX = 20 + textWidth;
      cursor.setAttribute('x1', cursorX);
      cursor.setAttribute('x2', cursorX);
    }
  };

  const svg = `{{contents}}`;
  container.innerHTML = svg;

  // Set up input handling
  setTimeout(() => {
    const svgElement = container.querySelector('svg');
    const hiddenInput = container.querySelector('#hiddenInput{{id}}');
    const displayText = container.querySelector('#displayText{{id}}');
    const cursor = container.querySelector('#cursor{{id}}');
    
    if (!svgElement || !hiddenInput || !displayText || !cursor) return;

    let isPlaceholder = true;
    const placeholder = '{{placeholder}}' || 'Type here...';

    // Focus handling
    svgElement.addEventListener('click', () => {
      hiddenInput.focus();
      cursor.style.display = 'block';
      
      if (isPlaceholder) {
        displayText.textContent = '';
        isPlaceholder = false;
      }
    });

    // Blur handling
    hiddenInput.addEventListener('blur', () => {
      cursor.style.display = 'none';
      
      if (hiddenInput.value === '') {
        displayText.textContent = placeholder;
        displayText.style.opacity = '0.5';
        isPlaceholder = true;
        resizeInput(200); // Reset to default width
      }
    });

    // Input handling with smooth resizing
    hiddenInput.addEventListener('input', (e) => {
      const text = e.target.value;
      displayText.textContent = text;
      displayText.style.opacity = '1';
      
      // Calculate new width based on text content
      const newWidth = calculateTextWidth(text);
      
      // Smooth resize animation
      resizeInput(newWidth);
      
      // Update cursor position
      updateCursorPosition(text);
      
      // Trigger callback if provided
      if (window.onAutoTextInput{{id}}) {
        window.onAutoTextInput{{id}}(text, newWidth);
      }
    });

    // Handle special keys
    hiddenInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && window.onAutoTextSubmit{{id}}) {
        window.onAutoTextSubmit{{id}}(hiddenInput.value);
      }
    });

    // Measure actual character widths once fonts load
    const measureCharacterWidths = () => {
      if (!document.fonts || !document.fonts.ready) return;
      
      document.fonts.ready.then(() => {
        // Create temporary SVG text element to measure actual widths
        const measurer = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        measurer.setAttribute('font-family', "'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace");
        measurer.setAttribute('font-size', '18px');
        measurer.setAttribute('x', '0');
        measurer.setAttribute('y', '0');
        measurer.style.visibility = 'hidden';
        svgElement.appendChild(measurer);
        
        // Measure common characters - for true constraint propagation like backer
        const charsToMeasure = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !@#$%^&*()_+-=[]{}|\\;:\'",.<>?/~`';
        
        // Measure each character individually
        for (let char of charsToMeasure) {
          measurer.textContent = char;
          try {
            const bbox = measurer.getBBox();
            if (bbox.width > 0) {
              charWidths[char] = bbox.width;
            }
          } catch (e) {
            // Some browsers might have issues with getBBox, fallback to default
            console.warn('Could not measure character:', char);
          }
        }
        
        // Update default width to average measured width
        const measuredWidths = Object.values(charWidths).filter(w => w > 0);
        if (measuredWidths.length > 0) {
          charWidths.default = measuredWidths.reduce((a, b) => a + b) / measuredWidths.length;
        }
        
        // Clean up
        svgElement.removeChild(measurer);
        
        // Re-measure current text with new widths
        const currentText = hiddenInput.value;
        if (currentText) {
          const newWidth = calculateTextWidth(currentText);
          resizeInput(newWidth);
          updateCursorPosition(currentText);
        }
      });
    };
    
    measureCharacterWidths();
  }, 100);

  // Public API
  window.autoTextInput{{id}} = {
    getValue: () => container.querySelector('#hiddenInput{{id}}')?.value || '',
    setValue: (text) => {
      const hiddenInput = container.querySelector('#hiddenInput{{id}}');
      const displayText = container.querySelector('#displayText{{id}}');
      if (hiddenInput && displayText) {
        hiddenInput.value = text;
        displayText.textContent = text;
        displayText.style.opacity = '1';
        const newWidth = calculateTextWidth(text);
        resizeInput(newWidth);
        updateCursorPosition(text);
      }
    },
    focus: () => container.querySelector('#hiddenInput{{id}}')?.focus(),
    clear: () => {
      const hiddenInput = container.querySelector('#hiddenInput{{id}}');
      const displayText = container.querySelector('#displayText{{id}}');
      if (hiddenInput && displayText) {
        hiddenInput.value = '';
        displayText.textContent = '{{placeholder}}' || 'Type here...';
        displayText.style.opacity = '0.5';
        resizeInput(200);
      }
    }
  };
})();