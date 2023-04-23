import * as THREE from 'three';

let scene, camera, renderer, stars, starGeo;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.about-me').appendChild(renderer.domElement);

  starGeo = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 6000; i++) {
    positions.push(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
  }
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  let sprite = new THREE.TextureLoader().load('/star.png');
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite,
    alphaTest: 0.5
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  window.addEventListener('resize', onWindowResize, false);

  document.querySelector('.about-me').addEventListener('mousemove', onMouseMove, false);

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  const mouseX = event.clientX / window.innerWidth; 
  const mouseY = event.clientY / window.innerHeight; 

  camera.position.x = (mouseX - 0.5) * 0.5; 
  camera.position.y = (0.5 - mouseY) * 0.5; 
  camera.lookAt(scene.position); 
}

function animate() {
  const positions = starGeo.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    let x = positions[i];
    let y = positions[i + 1];
    let z = positions[i + 2];
    y -= 0.2;
    if (y < -200) {
      y = 200;
    }
    positions[i + 1] = y;
  }
  starGeo.attributes.position.needsUpdate = true;
  stars.rotation.y += 0.002;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

export default init;
