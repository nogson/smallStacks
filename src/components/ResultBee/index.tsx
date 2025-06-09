import React, { useEffect, useRef } from "react";
import sytles from "./styles.module.scss";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Mesh, SkinnedMesh } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const ResultBee = ({}) => {
  const { scene, animations } = useGLTF("/model/bee.glb"); // モデルを読み込む
  const { actions } = useAnimations(animations, scene);
  const ref = useRef<THREE.Object3D>(null); // 回転を適用するための参照

  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
    if (child instanceof SkinnedMesh) {
      child.skeleton.update(); // Ensure skeleton updates
    }
  });

  useEffect(() => {
    if (actions) {
      const action = actions[Object.keys(actions)[0]]; // Use the first animation
      if (action) {
        action.play();
      }
    }
  }, [actions]);

  // 毎フレーム回転を更新
  useFrame(() => {
    if (ref.current) {
      const time = performance.now() * 0.001; // 時間を基準に回転
      const x = Math.sin(time) * 2; // 半径1でx軸を更新
      const z = Math.cos(time) * 2; // 半径1でz軸を更新
      const y = Math.sin(time * 2) * 0.25 + 2; // 上下運動を追加 (振幅0.5, 基準位置2)
  
      ref.current.position.set(x, y, z); // 位置を更新
      ref.current.lookAt(0, y, 0); // 原点を向くように設定
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={0.05} position={[0, 2, 1]} />
  );
};

export default ResultBee;
