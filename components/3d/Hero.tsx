import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useDevicePixelRatio } from "use-device-pixel-ratio";

interface Window {
  devicePixelRatio: number;
}

function createScene() {
  const scene = new THREE.Scene();
  // const sceneTexture = new THREE.TextureLoader().load("");
  // scene.background = sceneTexture;

  return scene;
}

const initial = {
  rows: 10,
  columns: 10,
  density: 0.33,
};

function createCamera(
  heroContainer: HTMLElement,
  position: [number, number, number]
) {
  const camera = new THREE.PerspectiveCamera(
    75,
    heroContainer.clientWidth / heroContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.set(...position);
  // camera.position.set(0, 25, 0);
  // camera.rotation.set(-Math.PI * 0.5, 0, 0);
  return camera;
}

function createLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(-5, 5, 5);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.setScalar(5);

  const pivotLight = new THREE.Object3D();
  pivotLight.add(directionalLight);

  return { ambientLight, pointLight, directionalLight, pivotLight };
}

function createRenderer(heroContainer: HTMLElement, dpr: number) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(dpr);

  renderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
  heroContainer.append(renderer.domElement);
  renderer.setClearColor(0x181818, 1);

  return renderer;
}

function generateInitialEpoch() {
  const targetNum = initial.rows * initial.columns * initial.density;

  // Use set of strings to produce unique co-ordinates
  const set = new Set<string>();

  while (set.size < targetNum) {
    const newCoords = `${Math.round(
      Math.random() * (initial.rows - 1)
    )},${Math.round(Math.random() * (initial.columns - 1))}`;

    if (!set.has(newCoords)) set.add(newCoords);
  }

  // Convert strings to actual co-ordinates
  const orderedList = Array.from(set)
    .map((coords) => coords.split(",").map((v) => Number(v)))
    .sort((a: number[], b: number[]) => {
      if (a[0] - b[0] > 0) return 1;
      if (a[0] - b[0] < 0) return -1;
      if (a[0] - b[0] === 0) {
        if (a[1] - b[1] > 0) return 1;
        if (a[1] - b[1] < 0) return -1;
      }
      return 0;
    });

  // Helper for visualizing the grid
  for (let y = 0; y < initial.columns; y++) {
    const row = orderedList.filter((cell) => cell[1] === y);
    // console.log(row);
    const rowText = Array(initial.rows).fill("-");
    // console.log(rowText);
    row.forEach((cell) => {
      rowText[cell[0]] = "o";
    });
    console.log(rowText.join(""));
  }

  return orderedList;
}

function generateNextEpoch(currentEpoch: [number, number][]) {
  //
  const newArray: [number, number][] = [];

  // scene.getObjectByName("");

  return newArray;
}

function createCell(x = 0, y = 0, z = 0, depth = 1) {
  // Geometry
  const shape = new THREE.Shape();
  const angleStep = Math.PI * 0.5;
  const radius = 0.125;

  shape.absarc(0.25, 0.25, radius, angleStep * 0, angleStep * 1, false);
  shape.absarc(-0.25, 0.25, radius, angleStep * 1, angleStep * 2, false);
  shape.absarc(-0.25, -0.25, radius, angleStep * 2, angleStep * 3, false);
  shape.absarc(0.25, -0.25, radius, angleStep * 3, angleStep * 4, false);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: depth,
    bevelEnabled: false,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelOffset: -0.025,
    bevelSegments: 10,
    curveSegments: 10,
  });
  geo.center();
  geo.rotateX(Math.PI * -0.5);

  // Material
  // const loader = new THREE.CubeTextureLoader();
  // loader.setPath("https://threejs.org/examples/textures/cube/pisa/");
  // const textureCube = loader.load([
  //   "px.png",
  //   "nx.png",
  //   "py.png",
  //   "ny.png",
  //   "pz.png",
  //   "nz.png",
  // ]);

  const mat = new THREE.MeshPhongMaterial({
    color: 0xadff16,
    shininess: 100,
    // envMap: textureCube,
  });

  const cell = new THREE.Mesh(geo, mat);

  cell.name = `cell[${x},${y},${z}]`;

  cell.position.set(x, y, z);

  return cell;
}

function killCell(
  scene: THREE.Scene,
  cell: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshPhongMaterial>
) {
  setTimeout(() => {
    scene.remove(cell);
  }, 300);
}

export default function Hero() {
  const heroContainer = useRef<HTMLDivElement>(null);
  const dpr = useDevicePixelRatio();

  useEffect(() => {
    if (!heroContainer) return;

    const scene = createScene();

    const camera = createCamera(
      heroContainer.current as HTMLDivElement,
      [5, 25, 5]
    );

    const { pointLight, directionalLight, pivotLight } = createLights();
    scene.add(pointLight, directionalLight, pivotLight);

    const renderer = createRenderer(heroContainer.current!, dpr);

    // populate grid with initial array
    const firstEpoch = generateInitialEpoch();
    firstEpoch.forEach(([x, z]) => {
      scene.add(createCell(x, 0, z));
    });

    console.log(scene);

    // Helpers
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    // controls.enableRotate = false;
    // controls.enableZoom = false;
    const gridHelper = new THREE.GridHelper(100, 100);
    const axesHelper = new THREE.AxesHelper(5);
    // const pointLightHelper = new THREE.PointLightHelper(pointLight);
    // const directionalLightHelper = new THREE.DirectionalLightHelper(
    //   directionalLight
    // );
    scene.add(gridHelper, axesHelper);

    // Animate
    function animate() {
      // calculate state for next epoch

      // regenerate grid if state is the same as 2 epochs ago

      requestAnimationFrame(animate);
      controls.update();

      pivotLight.rotation.y += 0.0025;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      heroContainer.current!.innerHTML = "";
    };
  }, [heroContainer, dpr]);

  return (
    <div
      ref={heroContainer}
      className="heroContainer absolute inset-0 bottom-0 h-full w-full"
    ></div>
  );
}
