(function(window) {
  'use strict';

  function getBackgroundAndGradients() {
    const svg = `<rect width="500" height="600" fill="transparent"/>
    
    <!-- Form Container with Metallic Background -->
    <linearGradient id="metallicBackground" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a2a2e"/>
      <stop offset="50%" stop-color="#323236"/>
      <stop offset="100%" stop-color="#2a2a2e"/>
    </linearGradient>
    <rect x="50" y="50" width="400" height="600" rx="15" fill="url(#metallicBackground)" 
      stroke="#444" stroke-width="1"/>
    
    <!-- Subtle Metallic Highlight -->
    <line x1="51" y1="52" x2="449" y2="52" stroke="#555" stroke-width="1" opacity="0.5"/>
    
    <!-- Form Header -->
    <text x="250" y="85" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
      fill="#ffffff" text-anchor="middle">US SHIPPING ADDRESS</text>
    
    <!-- Define the gradient for active input borders -->
    <linearGradient id="inputGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="purple"/>
      <stop offset="100%" stop-color="green"/>
    </linearGradient>
    
    <!-- Button Gradient -->
    <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop id="submitButtonGradientStart" offset="0%" stop-color="green"/>
      <stop id="submitButtonGradientEnd" offset="100%" stop-color="purple"/>
    </linearGradient>

    <linearGradient id="buttonPressedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="purple"/>
      <stop offset="100%" stop-color="green"/>
    </linearGradient>`;

    return svg;
  }

  function getInput(x, y, text, inputType) {
    const borderId = `${text.replace(/\s+/g, '')}Border`;
    const inputId = `${text.replace(/\s+/g, '')}Input`;

    const svg = `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="14" fill="#bbbbbb">${text}</text>
      <!-- Field Background -->
      <rect id="${borderId}" x="${x}" y="${y + 10}" width="340" height="40" rx="8" fill="#1c1c20" 
            stroke="#444" stroke-width="2" class="input-field"/>
      <!-- Inset shadow effect -->
      <rect x="${x + 2}" y="${y + 12}" width="336" height="36" rx="6" fill="none" 
            stroke="#000" stroke-width="1" opacity="0.3"/>
      <!-- HTML Input Field -->
      <foreignObject x="${x + 5}" y="${y + 15}" width="330" height="30">
        <input xmlns="http://www.w3.org/1999/xhtml" id="${inputId}" type="text" placeholder="Enter ${text.toLowerCase()}" data-field="${text}" spellcheck="false" style="width:100%; height: 100%; background-color: transparent; color: white; border: none; outline: none; padding: 8px 12px; font-size: 14px; font-family: Arial, sans-serif; border-radius: 6px;"/>
      </foreignObject>`;

    return svg;
  }

  function getSubmitButton(x, y) {
    return `<rect id="submitButton" x="${x}" y="${y}" width="300" height="45" rx="22.5" fill="url(#buttonGradient)" style="cursor: pointer;">
        </rect>
        <text x="${x + 150}" y="${y + 28}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" style="pointer-events: none;">SUBMIT</text>
    `;
  }

  function getForm(formJSON, onSubmit) {
    const keys = Object.keys(formJSON);
    const inputs = keys.map((key, index) => key === "form" ? '' : getInput(80, 70 * index + 130, key, formJSON[key]));
    
    const svg = getBackgroundAndGradients() + inputs.join('') + getSubmitButton(100, 70 * (keys.length) + 130);

    const container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    container.setAttribute('viewBox', `0 0 500 ${70 * keys.length + 250}`);
    container.setAttribute('width', '100%');
    container.setAttribute('height', 'auto');
    container.innerHTML = svg;

    setTimeout(() => {
      Object.keys(formJSON).forEach((key, index) => {
        if(key === 'form') {
          return;
        }

        const borderId = `${key.replace(/\s+/g, '')}Border`;
        const inputId = `${key.replace(/\s+/g, '')}Input`;
        const inputElement = document.getElementById(inputId);
        
        if (inputElement) {
          inputElement.addEventListener('input', (evt) => {
            const borderElement = document.getElementById(borderId);
            if (borderElement) {
              borderElement.setAttribute('stroke', 'url(#inputGradient)');
            }
          });
        }
      });

      const submitButton = document.getElementById('submitButton');
      if (submitButton) {
        submitButton.addEventListener('click', () => {
          console.log('Submit button clicked');
          
          // Create button animation
          const animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          animation.setAttribute("attributeName", "offset");
          animation.setAttribute("values", "-0.5;2.5");
          animation.setAttribute("dur", "300ms");
          animation.setAttribute("repeatCount", "1");

          const secondAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          secondAnimation.setAttribute("attributeName", "offset");
          secondAnimation.setAttribute("values", "0.5;3.5");
          secondAnimation.setAttribute("dur", "300ms");
          secondAnimation.setAttribute("repeatCount", "1");

          const startGradient = document.getElementById('submitButtonGradientStart');
          const endGradient = document.getElementById('submitButtonGradientEnd');
          
          if (startGradient && endGradient) {
            startGradient.appendChild(animation);
            endGradient.appendChild(secondAnimation);
            animation.beginElement();
            secondAnimation.beginElement();
          }

          // Collect form values
          const formValues = {};
          Object.keys(formJSON).forEach((key) => {
            if(key === 'form') {
              return;
            }

            const inputId = `${key.replace(/\s+/g, '')}Input`;
            const inputElement = document.getElementById(inputId);
            if (inputElement) {
              formValues[key] = inputElement.value;
            }
          });

          if (onSubmit) {
            onSubmit(formValues);
          }
        });
      }
    }, 100);

    return container;
  }

  window.getForm = getForm;

})(window);
