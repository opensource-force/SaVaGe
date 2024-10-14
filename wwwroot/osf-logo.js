(() => {
  const container = document.getElementById('osf-logo-container') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }


  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
    <!-- Shield base -->
    <path d="M100 10 L190 60 L190 180 L100 230 L10 180 L10 60 Z" fill="#4a80b5" stroke="#2c4b6e" stroke-width="5"/>
    
    <!-- Silver border -->
    <path d="M100 20 L180 65 L180 175 L100 220 L20 175 L20 65 Z" fill="none" stroke="#c0c0c0" stroke-width="8"/>
    
    <!-- Red design -->
    <path d="M100 40 L160 75 L160 165 L100 200 L40 165 L40 75 Z" fill="#9e2020"/>
    
    <!-- Arch Linux inspired logo -->
    <path d="M100 70 L130 130 H70 Z" fill="none" stroke="#1793d1" stroke-width="8" stroke-linejoin="round"/>
    <circle cx="100" cy="115" r="4" fill="#1793d1"/>
    
    <!-- Wing designs -->
    <path d="M60 140 Q80 130 100 140 Q120 130 140 140" fill="none" stroke="#c0c0c0" stroke-width="5"/>
    <path d="M70 155 Q85 145 100 155 Q115 145 130 155" fill="none" stroke="#c0c0c0" stroke-width="5"/>

    {{lightningBolt1}}
    {{lightningBolt2}}
    {{lightningBolt3}}

    {{openSourceForceText}}

  </svg>`
 
  container.innerHTML = svg;
 
})();
