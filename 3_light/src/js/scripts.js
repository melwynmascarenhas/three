import * as THREE from 'three';
import * as dat from 'dat.gui'

//control using mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }); //material on both inner and outer surface
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const spherMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, wireframe: false })
const sphere = new THREE.Mesh(sphereGeometry, spherMaterial);
scene.add(sphere);



const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 40, 0);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);


const gui = new dat.GUI();

//customizing the sphere material
const options = {
    sphereColor: '#ffea00',
    wireframes: false, ///this can be anything the one below is a material property
    speed: 0.01,
}

//setting the color by choosing the option
gui.addColor(options, 'sphereColor').onChange(function (e) {
    //receives the color when changed
    sphere.material.color.set(e);
})

//adding another property
gui.add(options, 'wireframes').onChange(function (e) {
    //wireframe is a material property
    sphere.material.wireframe = e;
})

gui.add(options, 'speed', 0, 0.1);

let step = 0;

const axeshelper = new THREE.AxesHelper(5);
scene.add(axeshelper);

camera.position.set(-10, 30, 30);
orbit.update();

function animate() {
    requestAnimationFrame(animate);

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

