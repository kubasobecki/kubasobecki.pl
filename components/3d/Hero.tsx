import { useRef, useEffect, useState, useMemo } from "react";
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

const tempBox = new THREE.Object3D();

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
  // console.log(initMap);

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
  return newMap;
}

function Scene({ population }: { population: number[][] }) {
  const camera = useRef(null!);
  const pointLight = useRef(null!);
  const directionalLight = useRef(null!);
  const directionalLightGroup = useRef<Group>(null!);
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  // Shared Geometry
  const cellGeometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(GOL.cubeSize, GOL.cubeSize);
    g.rotateX(Math.PI / 2);
    return g;
  }, []);

  // Shared Material
  const material = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: "#adff16",
        side: THREE.DoubleSide,
        shininess: 100,
      }),
    []
  );

  useHelper(camera, CameraHelper);
  useHelper(pointLight, PointLightHelper, 1, "red");
  useHelper(directionalLight, DirectionalLightHelper, 1, "red");

  useFrame(({ clock }) => {
    const t = clock.oldTime * 0.0005;
    directionalLightGroup.current.rotation.y = t;

    for (let i = 0; i < GOL.rows * GOL.columns; i++) {
      const currentRow = Math.floor((GOL.columns + i) / GOL.columns) - 1;
      const currentColumn = i % GOL.columns;
      const posX = currentRow - GOL.rows / 2 + 0.5;
      const posZ = currentColumn - GOL.columns / 2 + 0.5;
      tempBox.position.set(posX, 0, posZ);

      const isVisible = population[currentRow][currentColumn] > 0;
      tempBox.scale.setScalar(isVisible ? 1 : 0);

      tempBox.updateMatrix();
      meshRef.current.setMatrixAt(i, tempBox.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

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
        args={[cellGeometry, material, GOL.rows * GOL.columns]}
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

  // Stop when out of view
  const canvasRef = useRef(null!);
  const [frameloop, setFrameloop] = useState<"never" | "always">("never");
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [population, setPopulation] = useState(generateInitialEpoch);

  useEffect(() => {
    const heroObs = new IntersectionObserver(
      ([{ isIntersecting }]) => setIsHeroVisible(isIntersecting),
      { threshold: 0.1 }
    );

    heroObs.observe(canvasRef.current);

    setFrameloop(isHeroVisible ? "always" : "never");

    // Control Populations Per Second
    const render = setInterval(
      () => {
        setPopulation(generateNextEpoch(population));
      },
      isHeroVisible ? 1000 / GOL.pps : 86400000
    );

    return () => {
      heroObs.disconnect();
      clearInterval(render);
    };
  }, [isHeroVisible, population]);

  return (
    <div id="heroContainer" className="absolute inset-0 bottom-0 h-full w-full">
      <Canvas
        ref={canvasRef}
        frameloop={frameloop}
        linear
        gl={{ alpha: false, antialias: true, pixelRatio: dpr }}
        camera={{ position: [-0.001, 60, 0], fov: 45 }}
        style={{ background: "#181818" }}
      >
        <Scene population={population} />
        <Controls />
        {/* <axesHelper /> */}
        {/* <gridHelper args={[100, 100, 0xdddddd]} /> */}
        <Stats />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
