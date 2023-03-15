// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: document.getElementById('oil-background') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Resize canvas on window resize
window.addEventListener('resize', function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Add a point light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Create oil particles
const oilParticles = new THREE.Group();
scene.add(oilParticles);

const oilGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const oilMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });

for (let i = 0; i < 100; i++) {
  const oilParticle = new THREE.Mesh(oilGeometry, oilMaterial);
  oilParticle.position.set(
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
    Math.random() * 10 - 5
  );
  oilParticles.add(oilParticle);
}

// Position camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate oil particles
  oilParticles.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
