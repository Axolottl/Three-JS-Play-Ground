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
camera.position.setZ(30);

renderer.render( scene, camera);

var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000, 80, 100), new THREE.MeshToonMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide ,wireframe: true}));

const torus = new THREE.Mesh(new THREE.TetrahedronGeometry(10,4,20,100),new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe:true, wireframeLinewidth: 45, dithering: true}))

const heart = new THREE.Mesh(new THREE.TetrahedronGeometry(7,4),new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe:true, wireframeLinewidth: 45, dithering: true}))

const heart2 = new THREE.Mesh(new THREE.TetrahedronGeometry(5,4),new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe:true, wireframeLinewidth: 45, dithering: true}))

const beginning = new THREE.Mesh(new THREE.SphereGeometry(2,4),new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe:true, wireframeLinewidth: 45, dithering: true}))

plane.rotateX(360);
plane.rotateZ(-10);

scene.add(beginning);
scene.add(heart2);
scene.add(heart);
scene.add(torus);
scene.add(plane);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x000000);

scene.add(pointLight, ambientLight);

function animate(){
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  heart.rotation.x -= 0.02;
  heart.rotation.y -= 0.02;
  heart2.rotation.x += 0.03;
  heart2.rotation.y += 0.03;
  beginning.rotation.x -= 0.05;
  beginning.rotation.y -= 0.05;

  renderer.render(scene, camera);
}

animate();

function addRandom() {
  let star = new THREE.Mesh(new THREE.TetrahedronGeometry(1,2),new THREE.MeshLambertMaterial({color: 0xffffff, wireframe:true}));

  let [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 500 ));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(1000).fill().forEach(() => addRandom());
