(() => {
  const container = document.getElementById('3js-test') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
    {{contents}}
  </svg>`;

  container.innerHTML = svg;

  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(300, 300);

  // Add the renderer to the foreignObject div
  document.getElementById('threejs-container').appendChild(renderer.domElement);

  // Create a cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  // Animation loop
  function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
  }

  animate();

})();

