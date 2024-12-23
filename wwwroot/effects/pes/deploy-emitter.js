(() => {
  const emitter = {{emitter}};
  
  setTimeout(() => {
    window.deployEmitter && window.deployEmitter(emitter);
  }, {{delay}});
})();
