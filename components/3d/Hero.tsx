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
  rows: 5,
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

function generateInitialEpoch(): [number, number][] {
  const targetNum = initial.rows * initial.columns * initial.density;

  // Use set of strings to produce unique co-ordinates
  const set = new Set<string>();

  while (set.size < targetNum) {
    const x = Math.round(Math.random() * (initial.rows - 1));
    const z = Math.round(Math.random() * (initial.columns - 1));
    const newCoords = `${x},${z}`;
    if (!set.has(newCoords)) set.add(newCoords);
  }

  // Convert strings to actual co-ordinates and sort them
  const list: [string, string][] = Array.from(set).map((coords) => {
    const [x, z] = coords.split(",", 2);
    return [x, z];
  });
  const numList: [number, number][] = list.map((coords) => {
    const [x, z] = coords;
    return [Number(x), Number(z)];
  });

  const orderedList = numList.sort((a, b) => {
    if (a[0] - b[0] > 0) return 1;
    if (a[0] - b[0] < 0) return -1;
    if (a[0] - b[0] === 0) {
      if (a[1] - b[1] > 0) return 1;
      if (a[1] - b[1] < 0) return -1;
    }
    return 0;
  });

  return orderedList;
}

function generateNextEpoch(currentEpoch: [number, number][]) {
  //
  const currMap: number[][] = [];

  // Create bitmap from current epoch
  for (let r = 0; r < initial.rows; r++) {
    const cellsRow = currentEpoch.filter((cell) => cell[0] === r);

    const filledRow = Array(initial.columns).fill(0);

    for (const cell of cellsRow) filledRow[cell[1]] = 1;

    currMap.push(filledRow);
  }

  // Extend borders of bitmap with dead cells
  const currMapCopy = currMap.map((row) => [...row]);

  const currMapExt = currMapCopy.map((row) => {
    const rowExt = [...row];
    rowExt[-1] = 0;
    rowExt[rowExt.length] = 0;
    return rowExt;
  });
  currMapExt[-1] = Array(initial.columns + 2).fill(0);
  currMapExt[initial.rows] = Array(initial.columns + 2).fill(0);

  // Just to see the original bitmap 👀
  for (let i = 0; i < currMap.length; i++) console.log(currMap[i].join(" "));

  // Just to see the extended bitmap 👀
  // for (let i = -1; i < currMapExt.length; i++) {
  //   const row = [];
  //   for (let j = -1; j < currMapExt[i].length; j++) {
  //     row.push(currMapExt[i][j]);
  //   }
  //   console.log(row.join(" ").trim());
  // }

  const newMap: number[][] = [];

  // Count neighbours
  for (let row = 0; row < initial.rows; row++) {
    const newRow = [];
    for (let col = 0; col < initial.columns; col++) {
      let neighbours =
        currMapExt[row - 1][col - 1] +
        currMapExt[row - 1][col] +
        currMapExt[row - 1][col + 1] +
        currMapExt[row][col - 1] +
        currMapExt[row][col + 1] +
        currMapExt[row + 1][col - 1] +
        currMapExt[row + 1][col] +
        currMapExt[row + 1][col + 1];

      newRow[col] =
        neighbours === 3 || (neighbours === 2 && currMapExt[row][col] === 1)
          ? 1
          : 0;
    }
    newMap.push(newRow);
  }
  console.log("-------------New Map----------------");
  for (let i = 0; i < newMap.length; i++) console.log(newMap[i].join(" "));

  // scene.getObjectByName("");

  return newMap;
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
      [-0.001, 15, 0]
    );

    const { pointLight, directionalLight, pivotLight } = createLights();
    scene.add(pointLight, directionalLight, pivotLight);

    const renderer = createRenderer(heroContainer.current!, dpr);

    // populate grid with initial array
    const firstEpoch = generateInitialEpoch();
    firstEpoch.forEach(([x, z]) => {
      scene.add(createCell(x, 0, z));
    });

    generateNextEpoch(firstEpoch);
    // console.log(scene);

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
