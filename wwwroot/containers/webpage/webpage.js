(() => {
  const container = document.getElementById('savage') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }
  
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  
  const updateSVG = () => {
    const svg = `{{contents}}`;
    return svg;
  };

  let svg = updateSVG();

  const onResize = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    svg = updateSVG();

    container.innerHTML = svg;
  };

  window.addEventListener('resize', onResize);

  const byteCount = svg.length;
  const kbCount = Math.ceil(byteCount / 1000);
  svg = svg.replace('{svgSize}', kbCount + '');

  container.innerHTML = svg;

  setTimeout(() => {
    const fullSVG = document.getElementById("fullSVG");

    fullSVG.addEventListener("click", (evt) => {
      console.log('click at', evt);
      const startX = evt.screenX + (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 120));
      const jags = 3 + Math.floor(Math.random() * 6);
      const b = bolt(startX, 0, evt.screenX, evt.screenY, jags, 0);
console.log('created bolt');
      const newElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      document.getElementById("fullSVG").appendChild(newElement);
      newElement.innerHTML = b;
      console.log('should have added newElement', newElement);
    });
  }, 1000);


  const bolt = (startX, startY, endX, endY, jags, delay) => {
    let svg = `<defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <path id="bolt{{randomId}}"
        fill="none" 
        d="{{boltPath}}"
        stroke="#f2d51e" 
        stroke-width="3" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        opacity="0"
        filter="url(#glow)">
    <animate
      id="drawBolt{{randomId}}"
      attributeName="stroke-dasharray"
      from="0 300"
      to="300 300"
      begin="{{delay}}"
      dur="0.3s" 
      fill="remove"/>
    <animate
      attributeName="opacity"
      from="0"
      to="1"
      dur="0.3s"
      begin="{{delay}}"
      fill="freeze" />
  </path>

 
  <path id="boltLine{{randomId}}"
        fill="none" 
        d="{{boltPath}}"
        stroke="#ffffff" 
        stroke-width="1" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        opacity="0">
    <animate
      attributeName="stroke-dasharray"
      from="0 300"
      to="300 300"
      begin="{{delay}}"
      dur="0.3s" 
      fill="freeze"/>
    <animate
      attributeName="opacity"
      from="0"
      to="1"
      dur="0.3s"
      begin="{{delay}}"
      fill="freeze" />

  </path>

<animate
    xlink:href="#bolt{{randomId}}"
    attributeName="opacity"
    from="1"
    to="0"
    begin="drawBolt{{randomId}}.end"
    dur="0.2s"
    fill="freeze"/>

<animate
    xlink:href="#boltLine{{randomId}}"
    attributeName="opacity"
    from="1"
    to="0"
    begin="drawBolt{{randomId}}.end"
    dur="0.2s"
    fill="freeze"/>`;

         let path = `M${startX} ${startY}`;

         svg = svg.replace("{{delay}}", `${delay}`);

         const jagX = (endX - startX) / (jags - 1);
         const jagY = (endY - startY) / (jags - 1);;

         let xDirection = 1;

         let lineX = startX;
         let lineY = startY;

         while(jags > 0) 
         {
             lineX = lineX + Math.ceil(Math.random() * Math.abs(jagX)) * xDirection;
             lineY = lineY + Math.ceil(Math.random() * Math.abs(jagY));

             xDirection = xDirection * -1;
  
             path = `${path} L${lineX} ${lineY}`;

             jags--;
         }

         path = `${path} L${endX} ${endY}`;

         const randomId = `${Math.floor(Math.random() * 10000)}`;;        
         svg = svg.replace("{{randomId}}", randomId);
         svg = svg.replace("{{randomId}}", randomId);
         svg = svg.replace("{{randomId}}", randomId);
         svg = svg.replace("{{randomId}}", randomId);
         svg = svg.replace("{{randomId}}", randomId);
         svg = svg.replace("{{randomId}}", randomId);
         svg = svg.replace("{{randomId}}", randomId);

       
         svg = svg.replace("{{boltPath}}", path);
         svg = svg.replace("{{boltPath}}", path);

         return svg;
    };
 
})();

{{additionalJS}}
