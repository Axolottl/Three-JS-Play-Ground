import * as THREE from 'https://unpkg.com/three@0.129.0/build/three.module.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGL1Renderer(
  {
    canvas : document.querySelector('#bg'),
  }
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(90);

renderer.render( scene, camera);

var plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 100, 100), new THREE.MeshPhongMaterial({ color: 0xa0a0d, side: THREE.DoubleSide ,flatShading: THREE.FlatShading}));

console.log(plane.geometry.attributes.position.array);

const {array} = plane.geometry.attributes.position;

for (let i = 2;i < array.length;i+=3)
{
  array[i]=THREE.MathUtils.randFloatSpread(10);
}

const torus = new THREE.Mesh(new THREE.TetrahedronGeometry(11,4,20,100),new THREE.MeshLambertMaterial({color: 0xffffff, wireframe:true, wireframeLinewidth: 5, dithering: true}))

const heart = new THREE.Mesh(new THREE.TetrahedronGeometry(7,4),new THREE.MeshLambertMaterial({color: 0xffffff, wireframe:true, wireframeLinewidth: 5, dithering: true}))

const heart2 = new THREE.Mesh(new THREE.TetrahedronGeometry(4,4),new THREE.MeshLambertMaterial({color: 0xffffff, wireframe:true, wireframeLinewidth: 5, dithering: true}))


const beginning = new THREE.Mesh(new THREE.SphereGeometry(1,4),new THREE.MeshLambertMaterial({color: 0xffffff, wireframe:true, wireframeLinewidth: 5, dithering: true}))

plane.rotateX(90);
plane.rotateZ(-10);

scene.add(beginning);
scene.add(heart2);
scene.add(heart);
scene.add(torus);
scene.add(plane);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);
console.log(torus.position)
torus.position.set(0,22,0);
heart.position.set(0,22,0)
heart2.position.set(0,22,0)
beginning.position.set(0,22,0)
let rad = 0;
function animate(){
  requestAnimationFrame( animate );
  rad += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  heart.rotation.x -= 0.02;
  heart.rotation.y -= 0.02;
  heart2.rotation.x += 0.03;
  heart2.rotation.y += 0.03;
  beginning.rotation.x -= 0.05;
  beginning.rotation.y -= 0.05;

  const {array} = plane.geometry.attributes.position;
  for (let i = 2;i < array.length;i+=3)
  {
    array[i]=array[i]+THREE.MathUtils.randFloatSpread(0.5);
  }
  plane.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

animate();

function addRandom() {
  let star = new THREE.Mesh(new THREE.TetrahedronGeometry(1,2),new THREE.MeshLambertMaterial({color: 0xffffff, wireframe:true}));

  let [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(500).fill().forEach(() => addRandom());

function addRandomC() {
  let cube = new THREE.Mesh(new THREE.TetrahedronGeometry(0,0),new THREE.MeshLambertMaterial({color: 0xffffff, wireframe:true}));

  let [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ));

  cube.position.set(x,y,z);
  scene.add(cube);
}

Array(500).fill().forEach(() => addRandomC());

function addRandomT() {
  let cube = new THREE.Mesh(new THREE.TetrahedronGeometry(1,4),new THREE.MeshLambertMaterial({color: 0xffffff, wireframe:true}));

  let [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ));

  cube.position.set(x,y,z);
  scene.add(cube);
}

Array(500).fill().forEach(() => addRandomT());

function addRandomS() {
  let sphere = new THREE.Mesh(new THREE.SphereGeometry(0,0),new THREE.MeshLambertMaterial({color: 0xffffff, wireframe:true}));

  let [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ));

  cube.position.set(x,y,z);
  scene.add(cube);
}

Array(500).fill().forEach(() => addRandomS());
