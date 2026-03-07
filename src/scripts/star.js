import * as THREE from 'three';

const { BASE_URL } = import.meta.env;

let scene, camera, renderer, stars, starGeo, initialRotation;
let animationId = null;

function init() {
  const body = document.querySelector('body');
  const main = document.querySelector('main');
  if (!body || !main) return;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

  camera.position.z = 1;

  initialRotation = camera.rotation.clone();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  body.appendChild(renderer.domElement);

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

  const textureUrl = `${BASE_URL || ""}star.png`;
  const textureLoader = new THREE.TextureLoader();
  const sprite = textureLoader.load(
    textureUrl,
    undefined,
    undefined,
    (err) => {
      console.warn("Star texture failed to load:", err);
    }
  );
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite,
    alphaTest: 0.5
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  window.addEventListener('resize', onWindowResize, false);

  main.addEventListener('mousemove', onMouseMove, false);
  main.addEventListener('touchmove', onTouchMove, { passive: true });

  document.addEventListener('visibilitychange', onVisibilityChange);

  animate();
}

function onVisibilityChange() {
  if (document.hidden) {
    if (animationId != null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  } else if (animationId == null && starGeo && stars) {
    animate();
  }
}

function onWindowResize(event) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function setCameraPosition(event) {
  const normalizedX = event.clientX / window.innerWidth - 0.5; 
  const normalizedY = 0.5 - event.clientY / window.innerHeight;
  camera.position.x = normalizedX * 0.5; 
  camera.position.y = normalizedY * 0.5; 
  camera.lookAt(scene.position);
}

function onMouseMove(event) {
  setCameraPosition(event);
}

function onTouchMove(event) {
  setCameraPosition(event.touches[0]);
}

function animate() {
  if (!starGeo || !stars) return;
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
  if (!document.hidden) {
    animationId = requestAnimationFrame(animate);
  }
}

export default init;
