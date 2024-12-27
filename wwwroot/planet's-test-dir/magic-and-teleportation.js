(() => {

  let shrunk = false;

  const applyAnimations = (element) => {
    const startValue = shrunk ? 0.05 : 1;
    const endValue = shrunk ? 1 : 0.05;

console.log('startValue', startValue, 'endValue', endValue);

/*    const widthAnim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    widthAnim.setAttribute('attributeName', 'width');
    widthAnim.setAttribute('from', `${startValue}`);
    widthAnim.setAttribute('to', `${endValue}`);
    widthAnim.setAttribute('dur', '1s');
    widthAnim.setAttribute('begin', '1ms');
    widthAnim.setAttribute('repeatCount', '1');
    widthAnim.setAttribute('fill', 'freeze');

    const heightAnim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    heightAnim.setAttribute('attributeName', 'height');
    heightAnim.setAttribute('from', `${startValue}`);
    heightAnim.setAttribute('to', `${endValue}`);
    heightAnim.setAttribute('dur', '1000ms');
    heightAnim.setAttribute('begin', '1ms');
    heightAnim.setAttribute('repeatCount', '1');
    heightAnim.setAttribute('fill', 'freeze');*/

    const widthAnim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    widthAnim.setAttributeNS(null, 'attributeName', 'width');
    widthAnim.setAttributeNS(null, 'from', `${Math.round(window.innerWidth * startValue)}`);
    widthAnim.setAttributeNS(null, 'to', `${Math.round(window.innerWidth * endValue)}`);
    widthAnim.setAttributeNS(null, 'dur', '1s');
    widthAnim.setAttributeNS(null, 'begin', '1ms');
    widthAnim.setAttributeNS(null, 'repeatCount', '1');
    widthAnim.setAttributeNS(null, 'fill', 'freeze');

    //widthAnim.setAttributeNS(null, 'xlink:href', '#web-svg');

    const heightAnim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    heightAnim.setAttributeNS(null, 'attributeName', 'height');
    heightAnim.setAttributeNS(null, 'from', `${Math.round(window.innerHeight * startValue)}`);
    heightAnim.setAttributeNS(null, 'to', `${Math.round(window.innerHeight * endValue)}`);
    heightAnim.setAttributeNS(null, 'dur', '1000ms');
    heightAnim.setAttributeNS(null, 'begin', '1ms');
    heightAnim.setAttributeNS(null, 'repeatCount', '1');
    heightAnim.setAttributeNS(null, 'fill', 'freeze');
    
    //heightAnim.setAttributeNS(null, 'xlink:href', '#web-svg');

    element.appendChild(widthAnim);
    element.appendChild(heightAnim);

    widthAnim.beginElement();
    heightAnim.beginElement();
  };

  setTimeout(() => {
    const magicSVG = document.getElementById('magic-svg');
    const teleportationSVG = document.getElementById('teleportation-svg');
    const webSVG = document.getElementById('web-svg');

    magicSVG.addEventListener('click', () => {
      applyAnimations(webSVG);
      const magicIFrame = document.createElement('iframe');
      magicIFrame.setAttribute('style', 'position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1;');
      magicIFrame.setAttribute('src', 'https://github.com/planet-nine-app/MAGIC?tab=readme-ov-file#magic');   

//      fetch('https://github.com/planet-nine-app/MAGIC?tab=readme-ov-file#magic').then(console.log).catch(console.warn);

      const webpage = document.getElementById('webpage');
      webpage.insertBefore(magicIFrame, webpage.firstChild);
    });

    teleportationSVG.addEventListener('click', () => {
      applyAnimations(webSVG);
      const teleportationIFrame = document.createElement('iframe');
      teleportationIFrame.setAttribute('style', 'position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1;');
      iframe.setAttribute('src', 'https://github.com/planet-nine-app/teleportation?tab=readme-ov-file#teleportation');   
      const webpage = document.getElementById('webpage');
      webpage.insertBefore(teleportationIFrame, webpage.firstChild);
    });
  }, 1000);
})();
