import {
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
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
  Instances,
  Instance,
  Stats,
} from "@react-three/drei";
import { useDevicePixelRatio } from "use-device-pixel-ratio";
import { useControls } from "leva";

THREE.ColorManagement.enabled = true;
const lime = new THREE.MeshPhongMaterial({ color: "#adff16", shininess: 100 });
// const box = new THREE.RoundedBox(1, 28, 28);

function Scene() {
  const camera = useRef(null!);
  const pointLight = useRef(null!);
  const directionalLight = useRef(null!);
  const directionalLightGroup = useRef<Group>(null!);
  const cellsGroup = useRef<Group>(null!);

  useHelper(camera, CameraHelper);
  useHelper(pointLight, PointLightHelper, 1, "red");
  useHelper(directionalLight, DirectionalLightHelper, 1, "red");

  useFrame(({ clock }) => {
    // directionalLightGroup.current.rotation.y =
    //   (Math.sin(clock.elapsedTime) * Math.PI) / 4;
    directionalLightGroup.current.rotation.y += 0.005;
  });

  //
  // Game of Life logic
  //
  const initial = {
    rows: 100,
    columns: 100,
    density: 0.5,
    fps: 1000 / 33,
    cubeSize: 0.8,
  };

  // Generate initial epoch
  const generateInitialEpoch = useCallback((): number[][] => {
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
    for (let r = 0; r < initial.rows; r++) {
      const cellsRow = numList.filter((cell) => cell[0] === r);
      const filledRow = Array(initial.columns).fill(0);
      for (const cell of cellsRow) filledRow[cell[1]] = 1;
      initMap.push(filledRow);
    }

    // console.log("---Initial Map-------------");
    // for (let i = 0; i < initMap.length; i++) console.log(initMap[i].join(" "));

    return initMap;
  }, [initial.rows, initial.columns, initial.density]);

  const generateNextEpoch = useCallback(
    (currentEpoch: number[][]): number[][] => {
      // Extend borders of bitmap with dead cells
      const currMapExt = currentEpoch.map((row) => {
        const rowExt = [...row];
        rowExt[-1] = 0;
        rowExt[rowExt.length] = 0;
        return rowExt;
      });
      currMapExt[-1] = Array(initial.columns + 2).fill(0);
      currMapExt[initial.rows] = Array(initial.columns + 2).fill(0);

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
    },
    [initial.rows, initial.columns]
  );

  // Generate initial epoch
  const [population, setPopulation] = useState(generateInitialEpoch());

  useEffect(() => {
    const evolveWorld = setInterval(() => {
      // Prepare new epoch
      const nextPopulation = generateNextEpoch(population);
      setPopulation(nextPopulation);
    }, initial.fps);

    // Clear
    return () => {
      clearInterval(evolveWorld);
    };
  }, [population, generateNextEpoch, initial.fps]);

  // useEffect(() => {
  //   console.count("evolved!");
  // }, [population]);

  // Update epochs
  // useEffect(() => {
  //   // Generate initial epoch
  //   setInterval(() => {
  //     // console.count(currentEpoch);
  //   }, initial.fps);

  //   // Evolve world
  //   const evolveWorld = setInterval(() => {
  //     const nextEpoch = generateNextEpoch(currentEpoch);
  //     currentEpoch = nextEpoch;
  //   }, initial.fps);

  //   return () => {
  //     clearInterval(evolveWorld);
  //   };
  // }, []);

  // useFrame(() => {
  //   const nextEpoch = generateNextEpoch(currentEpoch);
  //   currentEpoch = nextEpoch;
  // console.log(...currentEpoch);
  // });

  return (
    <>
      {/* <perspectiveCamera ref={camera} position={[-0.001, 5, 0]} fov={70} /> */}
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
      <group ref={cellsGroup} position={[0.5, 0, 0.5]}>
        <Instances
          limit={initial.rows * initial.columns} // Optional: max amount of items (for calculating buffer size)
          range={initial.rows * initial.columns} // Optional: draw-range
        >
          <boxGeometry
            args={[initial.cubeSize, initial.cubeSize, initial.cubeSize]}
            // radius={0.1}
            // smoothness={4}
            // creaseAngle={0.4}
          ></boxGeometry>
          <meshPhongMaterial color="#adff16" shininess={100} />
          {Array.from({ length: initial.rows * initial.columns }, (_, i) => {
            const currentRow =
              Math.floor((initial.columns + i) / initial.columns) - 1;
            const currentColumn = i % initial.columns;
            const posX = currentRow - initial.columns / 2;
            const posZ = currentColumn - initial.rows / 2;
            const isVisible = population[currentRow][currentColumn] > 0;
            // console.count("!");
            return population[currentRow][currentColumn] > 0 ? (
              <Instance
                key={i}
                visible={isVisible}
                position={[posX, 0, posZ]}
                // onUpdate={(self) => console.log("props have been updated")}
              />
            ) : null;
          })}
        </Instances>
      </group>
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
        camera={{ position: [-0.001, 15, 0], fov: 70 }}
        style={{ background: "#181818" }}
      >
        <Scene />
        <Controls />
        <axesHelper />
        <gridHelper args={[100, 100, 0xdddddd]} />
        <Stats />
      </Canvas>
    </div>
  );
}
