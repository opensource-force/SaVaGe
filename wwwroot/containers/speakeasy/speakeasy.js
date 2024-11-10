(() => {
  const openDoors = () => {
    const windowLeftWidth = Math.floor(window.innerWidth / 2);
    const windowRightWidth = Math.ceil(window.innerWidth / 2);
    const windowHeight = window.innerHeight;
    console.log(document.body);

    const leftDiv = document.createElement("div");
    const rightDiv = document.createElement("div");

    const left = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const right = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    left.setAttribute("x", "0");
    left.setAttribute("y", "0");
    left.setAttribute("width", `${window.innerWidth}`);
    left.setAttribute("height", `${windowHeight}`);
    leftDiv.setAttribute("style", `position: absolute; left: 0; top: 0; width: ${window.innerWidth}px;  height: ${windowHeight}px; background-color: green`);

    right.setAttribute("x", `${-windowLeftWidth}`);
    right.setAttribute("y", "0");
    right.setAttribute("width", `${window.innerWidth}`);
    right.setAttribute("height", `${windowHeight}`);
    right.setAttribute("style", "margin: 0; padding: 0;");
    rightDiv.setAttribute("style", `position:absolute;left:${windowLeftWidth}px;top:0;width:${window.innerWidth}px;height:${windowHeight}px;background-color:blue;margin:0;padding:0;`);

    // Create defs elements
    const leftDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const rightDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Create clipPath elements
    const leftClipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    const rightClipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');

    // Set clipPath IDs
    leftClipPath.setAttribute('id', 'leftClipPath');
    rightClipPath.setAttribute('id', 'rightClipPath');

    // Create rect elements
    const leftRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const rightRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    // Set rect attributes
    leftRect.setAttribute('x', '0');
    leftRect.setAttribute('y', '0');
    leftRect.setAttribute('width', windowLeftWidth);
    leftRect.setAttribute('height', windowHeight);

//    rightRect.setAttribute('x', windowRightWidth);
    rightRect.setAttribute('x', '0');
    rightRect.setAttribute('y', '0');
    rightRect.setAttribute('width', windowRightWidth);
    rightRect.setAttribute('height', windowHeight);

    // Build the structure
    leftClipPath.appendChild(leftRect);
    rightClipPath.appendChild(rightRect);
    leftDefs.appendChild(leftClipPath);
    rightDefs.appendChild(rightClipPath);

    left.innerHTML = 
      `<foreignObject width="${window.innerWidth}" height="${window.innerHeight}" clip-path="url(#leftClipPath)">
        ${document.body.innerHTML}
      </foreignObject>`;
    right.innerHTML = 
      `<foreignObject x=${-windowLeftWidth} width="${window.innerWidth}" height="${window.innerHeight}" clip-path="url(#rightClipPath)" style="margin: 0; padding: 0;">
        ${document.body.innerHTML}
      </foreignObject>`;

    // Add to SVGs
    left.appendChild(leftDefs);
    right.appendChild(rightDefs);



  console.log(left.innerHTML);
  console.log(left);

    let slideLeft = 0;
    let slideRight = windowLeftWidth; 

    const slideOut = () => {
console.log('are we slidin\'');
      slideLeft -= 2;
      slideRight += 2;
      leftDiv.style.left = `${slideLeft}px`;
      rightDiv.style.left = `${slideRight}px`;
console.log(slideLeft, 'slideLeft');
console.log(slideRight, 'slideRight');
console.log(window.innerWidth - 100);
     
      if(slideLeft < 100 - window.innerWidth || slideRight > window.innerWidth - 100) {
        return;
      }

      requestAnimationFrame(slideOut);
/*      const leftAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
      leftAnimation.setAttribute("dur", "1000ms");
      leftAnimation.setAttribute("repeatCount", "1");
      leftAnimation.setAttribute("path", `M 0,0 L ${-(leftWindowWidth - 100)},0`);
      leftAnimation.setAttribute("fill", "freeze");

      const rightAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
      leftAnimation.setAttribute("dur", "1000ms");
      leftAnimation.setAttribute("repeatCount", "1");
      leftAnimation.setAttribute("path", `M 0,0 L ${rightWindowWidth - 100},0`);
      leftAnimation.setAttribute("fill", "freeze");

      left.appendChild(leftAnimation);
      right.appendChild(rightAnimation); */
    };

    left.addEventListener('click', () => requestAnimationFrame(slideOut));
    right.addEventListener('click', () => requestAnimationFrame(slideOut));

    leftDiv.appendChild(left);
    rightDiv.appendChild(right);

    document.body.innerHTML = '';
    document.body.appendChild(leftDiv);
    document.body.appendChild(rightDiv);
    window.removeEventListener('click', openDoors);
  };

  window.addEventListener('click', openDoors);
})();
