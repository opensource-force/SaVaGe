(() => {
  const substringsToCheck = {{substrings}};
  if(Array.isArray(substringsToCheck)) {
    let ads = [];
    const divs = Array.from(document.getElementsByTagName('div'));
    substringsToCheck.forEach((substring) => {
console.log(substring);
      ads = [...ads, ...divs.filter(div => (div.id.indexOf(substring) > -1 || Array.from(div.classList).join(' ').indexOf(substring) > -1))];
    });
    
console.log(ads);

    ads.forEach(ad => {
      const script = document.createElement('script');
      script.src = `https://dev.savage.allyabase.com/parent-container.js?parentElementId=${ad.id}&decoration={{decoration}}`;
      document.body.appendChild(script);
    });
  }
})();
