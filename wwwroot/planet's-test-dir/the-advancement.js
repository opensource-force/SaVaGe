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

/*    magicSVG.addEventListener('click', () => {
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
    });*/

    const videoSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
//    videoSVG.setAttribute("x", "50%");
//    videoSVG.setAttribute("y", "75%");
//    videoSVG.setAttribute("width", "66%");
//    videoSVG.setAttribute("height", "33%");
    videoSVG.setAttribute("style", "position: absolute;left: 50%;top: 75%;width: 66%;height: 33%;z-index: 1002;overflow: hidden;");
//    videoSVG.setAttribute("viewBox", "0 0 400 400");

    const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    background.setAttribute("x", "50%");
    background.setAttribute("y", "75%");
    background.setAttribute("width", "20%");
    background.setAttribute("height", "20%");
    background.setAttribute("fill", "blue");

    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", "https://player.vimeo.com/video/1056629670?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;transparent=1");
    iframe.setAttribute("frameborder", 0);
    iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture; clipboard-write");
    iframe.setAttribute("style", "position: relative; top: 0; left: 0; width: 100%; height: 100%; margin: 0; padding: 0;z-index:10000;");
    iframe.setAttribute("title", "MAGIC and Teleportation");

    const script = document.createElement("script");
    script.setAttribute("src", "https://player.vimeo.com/api/player.js");

    const fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    fo.setAttribute("x", "30%");
    fo.setAttribute("y", "60%");
    fo.setAttribute("width", "40%");
    fo.setAttribute("height", "30%");


    const div = document.createElement("div");
    div.setAttribute("width", "100%");
    div.setAttribute("height", "100%");
    div.setAttribute("style", "width: 100%; height: 100%; position: relative; overflow: hidden;");

    //div.appendChild(vidya);
    div.appendChild(iframe);
    div.appendChild(script);

    fo.appendChild(div);

    //videoSVG.innerHTML = video;
    
    videoSVG.appendChild(fo);
    //videoSVG.appendChild(background);

    document.getElementById('web-svg').appendChild(videoSVG);
    
  }, 1000);
})();
