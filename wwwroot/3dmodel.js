(() => {
const renderModel = () => {
  const container = document.getElementById('3d-model-test') || document.createElement('div');
  if(!container.id) {
    document.body.appendChild(container);
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
    {{contents}}
  </svg>`;

  container.innerHTML = svg;

  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);

  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Load GLB file
  const loader = new GLTFLoader();
  loader.load(
      'LowPoly_Chicken_Model.glb',  // Replace with your GLB file path
      function (gltf) {
	  model = gltf.scene;
	  scene.add(model);

	  // Optional: Adjust model position, rotation, or scale if needed
	  // model.position.set(0, 0, 0);
	  // model.rotation.set(0, 0, 0);
	  // model.scale.set(1, 1, 1);
      },
      function (xhr) {
	  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
	  console.error('An error happened', error);
      }
  );

  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);

  animate();
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Optional: Add animation to the model
  if (model) {
      model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

setTimeout(() => {
  if(!THREE) {
    console.log('no THREE, but how bout window.THREE?', window.THREE);
    setTimeout(renderModel, 1000);
    return;
  }
  renderModel();
}, 1000);
})();

