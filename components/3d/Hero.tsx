import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import {
  CameraHelper,
  PointLightHelper,
  DirectionalLightHelper,
  Group,
} from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  useHelper,
  Stats,
  Environment,
} from "@react-three/drei";
import { useDevicePixelRatio } from "use-device-pixel-ratio";

const GOL = {
  rows: 60,
  columns: 280,
  density: 0.5,
  fps: 30,
  pps: 6,
  cubeSize: 0.66,
};

const tempBoxes = new THREE.Object3D();

function generateInitialEpoch(): number[][] {
  const targetNum = GOL.rows * GOL.columns * GOL.density;

  // Use set of strings to produce unique co-ordinates
  const set = new Set<string>();

  while (set.size < targetNum) {
    const x = Math.round(Math.random() * (GOL.rows - 1));
    const z = Math.round(Math.random() * (GOL.columns - 1));
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

  // const orderedList = numList.sort((a, b) => {
  //   if (a[0] - b[0] > 0) return 1;
  //   if (a[0] - b[0] < 0) return -1;
  //   if (a[0] - b[0] === 0) {
  //     if (a[1] - b[1] > 0) return 1;
  //     if (a[1] - b[1] < 0) return -1;
  //   }
  //   return 0;
  // });

  const initMap: number[][] = [];

  // Create bitmap from current epoch
  for (let r = 0; r < GOL.rows; r++) {
    const cellsRow = numList.filter((cell) => cell[0] === r);
    const filledRow = Array(GOL.columns).fill(0);
    for (const cell of cellsRow) filledRow[cell[1]] = 1;
    initMap.push(filledRow);
  }

  // console.log("---Initial Map-------------");
  // for (let i = 0; i < initMap.length; i++) console.log(initMap[i].join(" "));

  return initMap;
}

function generateNextEpoch(currentEpoch: number[][]): number[][] {
  // Extend borders of bitmap with dead cells
  const currMapExt = currentEpoch.map((row) => {
    const rowExt = [...row];
    rowExt[-1] = 0;
    rowExt[rowExt.length] = 0;
    return rowExt;
  });
  currMapExt[-1] = Array(GOL.columns + 2).fill(0);
  currMapExt[GOL.rows] = Array(GOL.columns + 2).fill(0);

  // Just to see the original bitmap 👀
  // for (let i = 0; i < currentEpoch.length; i++)
  //   console.log(currentEpoch[i].join(" "));

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
  for (let row = 0; row < GOL.rows; row++) {
    const newRow = [];
    for (let col = 0; col < GOL.columns; col++) {
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
  // console.log("---New Map----------------");
  // for (let i = 0; i < newMap.length; i++) console.log(newMap[i].join(" "));

  // Convert to cells array
  // const nextEpoch = [];
  // for (let row = 0; row < newMap.length; row++) {
  //   for (let col = 0; col < newMap[row].length; col++) {
  //     if (newMap[row][col] === 1) nextEpoch.push([row, col]);
  //   }
  // }

  // return nextEpoch as [number, number][];
  return newMap as [number][];
}

function Scene() {
  const camera = useRef(null!);
  const pointLight = useRef(null!);
  const directionalLight = useRef(null!);
  const directionalLightGroup = useRef<Group>(null!);

  const [population, setPopulation] = useState(generateInitialEpoch());
  const [frame, setFrame] = useState(0);
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const cellsGeometry = new THREE.PlaneGeometry(GOL.cubeSize, GOL.cubeSize);
  cellsGeometry.rotateX(Math.PI / 2);
  const material = new THREE.MeshPhongMaterial({
    color: "#adff16",
    side: THREE.DoubleSide,
    shininess: 100,
  });

  useHelper(camera, CameraHelper);
  useHelper(pointLight, PointLightHelper, 1, "red");
  useHelper(directionalLight, DirectionalLightHelper, 1, "red");

  useFrame(({ clock }) => {
    const t = clock.oldTime * 0.0005;
    directionalLightGroup.current.rotation.y = t;
    // cellsGeometry.rotateX(Math.sin(t));

    for (let i = 0; i < GOL.rows * GOL.columns; i++) {
      const currentRow = Math.floor((GOL.columns + i) / GOL.columns) - 1;
      const currentColumn = i % GOL.columns;
      const posX = currentRow - GOL.rows / 2 + 0.5;
      const posZ = currentColumn - GOL.columns / 2 + 0.5;
      tempBoxes.position.set(posX, 0, posZ);

      const isVisible = population[currentRow][currentColumn] > 0;
      tempBoxes.scale.setScalar(isVisible ? 1 : 0);

      tempBoxes.updateMatrix();
      meshRef.current.setMatrixAt(i, tempBoxes.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  useEffect(() => {
    // control Frames Per Second
    const render = setInterval(() => {
      setFrame((frame) => (frame % GOL.fps) + 1);

      // control Populations Per Second
      if (frame % (GOL.fps / GOL.pps) < 1)
        setPopulation(generateNextEpoch(population));
    }, 1000 / GOL.fps);

    return () => {
      clearInterval(render);
    };
  }, [frame, population]);

  return (
    <>
      <perspectiveCamera ref={camera} position={[-0.001, 5, 0]} fov={70} />

      <ambientLight color="white" intensity={0.5} />
      <pointLight ref={pointLight} color="white" position={[5, 5, 5]} />

      <group ref={directionalLightGroup}>
        <directionalLight
          ref={directionalLight}
          color="white"
          intensity={1}
          position={[5, 5, 5]}
        />
      </group>

      <instancedMesh
        ref={meshRef}
        args={[cellsGeometry, material, GOL.rows * GOL.columns]}
      />
    </>
  );
}

function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return <OrbitControls args={[camera, domElement]} />;
}

export default function Hero() {
  const dpr = useDevicePixelRatio();

  return (
    <div id="heroContainer" className="absolute inset-0 bottom-0 h-full w-full">
      <Canvas
        frameloop="demand"
        linear
        gl={{ alpha: false, antialias: true, pixelRatio: dpr }}
        camera={{ position: [-0.001, 60, 0], fov: 45 }}
        style={{ background: "#181818" }}
      >
        <Scene />
        <Controls />
        {/* <axesHelper /> */}
        {/* <gridHelper args={[100, 100, 0xdddddd]} /> */}
        <Stats />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
