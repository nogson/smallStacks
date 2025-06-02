import sytles from "./styles.module.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import * as THREE from "three";
import ResultItem from "../ResultItem";

const RotatingCamera = () => {
  const cameraRef = useRef(null);

  useFrame(({ camera }) => {
    const time = performance.now() * 0.0001; // 時間を基準に回転
    camera.position.x = Math.sin(time) * 10; // x軸を回転
    camera.position.z = Math.cos(time) * 10; // z軸を回転
    camera.lookAt(0, 0, 0); // 常に原点を向く
  });

  return null;
};

const Result = () => {
  return (
    <>
      <div className={sytles.result}>
        <Canvas
          orthographic
          camera={{
            zoom: 50,
            position: [4, 4, 4],
            near: 0.1,
            far: 100,
          }}
          style={{
            backgroundColor: "#f0f0f0",
          }}
          shadows={"soft"}
        >
          <RotatingCamera />
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#FFEDBB" />
          </mesh>
          <Suspense fallback={null}>
            <ResultItems />
          </Suspense>

          <ambientLight intensity={1} />
          <directionalLight
            color={"#ffffff"}
            intensity={1}
            position={[2, 5, 2]}
            castShadow
          />
          <pointLight
            color={"#FDF8E8"}
            intensity={10}
            position={[0, 2, 0]}
            castShadow
          />
        </Canvas>
      </div>
    </>
  );
};

const ResultItems = () => {
  const { scene, animations } = useGLTF("/model/grass.glb"); // モデルを読み込む
  const itemCount = Array.from({ length: 31 - 1 }, (_, index) => index);
  const planeSize = 8;
  const columns = 7; // 1行に配置するアイテム数
  const rows = Math.ceil(itemCount.length / columns); // 必要な行数
  const spacingX = planeSize / columns; // x方向の間隔
  const spacingZ = planeSize / rows; // z方向の間隔

  return (
    <>
      {itemCount.map((_, index) => {
        const row = Math.floor(index / columns); // 行番号
        const col = index % columns; // 列番号

        // x, z の位置を計算 (-planeSize / 2 から planeSize / 2 の範囲内に配置)
        const x = col * spacingX - planeSize / 2 + spacingX / 2;
        const z = row * spacingZ - planeSize / 2 + spacingZ / 2;
        return (
          <ResultItem
            key={`result-item-${index}`} // 一意なキー
            position={[x, 0, z]} // 計算した位置
            displayFrameNumber={30}
            scene={scene.clone()} // シーンを複製
            animations={animations.map((anim) => anim.clone())} // アニメーションを複製
          />
        );
      })}
    </>
  );
};

export default Result;
