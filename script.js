import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const scene = new THREE.Scene();

//Object
const cube = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const mesh = new THREE.Mesh(cube);
mesh.position.y = 0.5;
scene.add(mesh);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#444444",
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const hemilight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemilight.position.set(0, 50, 0);
scene.add(hemilight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dirLight);

const cursor = {
  x: 0,
  y: 8,
};

const loader = new GLTFLoader();
loader.load("static/models/beach/Пляж.gltf", (gltf) => {
  console.log("success");
  console.log(gltf);
  scene.add(gltf.scene);
});

//Camera
const sizes = {
  width: 600,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

const canvas = document.querySelector(".canvas");

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

window.addEventListener("mousemove", (event) => {
  cursor.x = -(event.clientX / sizes.width - 0.5);
  cursor.y = event.clientY / sizes.height - 0.5;
});

const tick = () => {
  camera.position.x = cursor.x;
  camera.position.y = cursor.y;
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
