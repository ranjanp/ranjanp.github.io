//ok this is zack's thing actually

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
let ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
let shouldResize = false;

const mountRoot = document.querySelector('#container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
scene.add(camera);

const floorGeo = new THREE.PlaneGeometry(5000, 5000, 1, 1);
const floorMat = new THREE.MeshBasicMaterial({ color: 0xaaffff });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.position.y = -101;
floor.rotation.x = -0.5*Math.PI;
scene.add(floor);

const grid = new THREE.GridHelper(5000, 100, 0x888888, 0x888888);
grid.position.y = -100;
scene.add(grid);

const skyGeo = new THREE.PlaneGeometry(20000, 2500, 1, 1);
const skyMat = new THREE.MeshPhongMaterial({ color: 0x888888 });
const sky = new THREE.Mesh(skyGeo, skyMat);
sky.position.z = -5000;
sky.position.y = 1000;
scene.add(sky);

const boxMat = new THREE.MeshNormalMaterial({color : 0x0000ff});
var boxes = []
boxes[0] = new THREE.Mesh(new THREE.IcosahedronGeometry(1,0), boxMat);
boxes[0].position.set(0,1,-10);
boxes[0].rotation.set(0.25*Math.PI,0.25*Math.PI,0.25*Math.PI);
boxes[1] = new THREE.Mesh(new THREE.IcosahedronGeometry(1,0), boxMat);
boxes[1].position.set(0,1,-10);
boxes[1].rotation.set(0.25*Math.PI,0.25*Math.PI,0.25*Math.PI);
boxes[2] = new THREE.Mesh(new THREE.IcosahedronGeometry(1,0), boxMat);
boxes[2].position.set(0,1,-10);
boxes[2].rotation.set(0.25*Math.PI,0.25*Math.PI,0.25*Math.PI);
scene.add(boxes[0], boxes[1], boxes[2]);

const skyLight = new THREE.PointLight(0xff0080, 1, 0, 1);
skyLight.position.x = 0;
skyLight.position.y = -600;
skyLight.position.z = -1000;
scene.add(skyLight);

const boxLight = new THREE.PointLight(0xffffff, 1, 50);
boxLight.position.z = -5;
boxLight.position.y = 0.5;
scene.add(boxLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
mountRoot.appendChild(renderer.domElement);

function update() {
  if (shouldResize) {
    resize();
    shouldResize = false;
  }

  grid.position.z = (grid.position.z + 5) % 100;
  boxes[0].rotation.y  = (boxes[0].rotation.y - 0.025) % (2*Math.PI);
  boxes[1].rotation.x  = (boxes[1].rotation.x - 0.025) % (2*Math.PI);
  boxes[2].rotation.z  = (boxes[2].rotation.z - 0.025) % (2*Math.PI);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

function resize() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  ASPECT = WIDTH / HEIGHT;

  camera.aspect = ASPECT;
  camera.updateProjectionMatrix();
  renderer.setSize(WIDTH, HEIGHT);
}

window.addEventListener('resize', () => {
  shouldResize = true;
});

requestAnimationFrame(update);

//document.addEventListener('click', () => mountRoot.webkitRequestFullscreen());
