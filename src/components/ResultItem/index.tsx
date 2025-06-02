import sytles from "./styles.module.scss";
import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

type Props = {
  position?: [number, number, number];
  displayFrameNumber?: number; // フレーム番号を受け取る
  scene: THREE.Group<THREE.Object3DEventMap>;
  animations: THREE.AnimationClip[]; // アニメーションを受け取る
};

const ResultItem: React.FC<Props> = ({
  position,
  displayFrameNumber = 0,
  scene,
  animations,
}) => {
  console.log(position)
  const { actions } = useAnimations(animations, scene); // アニメーションを適用
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true; // 影を落とす
      child.receiveShadow = true; // 影を受け取る
    }
  });
  // アニメーションを再生
  useEffect(() => {
    if (actions) {
      const action = actions["Animation"];
      if (action) {
        action.clampWhenFinished = true; // アニメーション終了時に停止
        action.loop = THREE.LoopOnce;
        action.play(); // "AnimationName" を実際のアニメーション名に置き換える
      }
    }
  }, [actions, displayFrameNumber]);

  // フレーム監視して特定のフレームで停止
  useFrame(() => {
    if (actions) {
      const action = actions["Animation"];
      if (action && action.isRunning()) {
        const frameRate = 24; // アニメーションのフレームレート（例: 24fps）
        const stopFrame = displayFrameNumber; // 停止したいフレーム番号
        const stopTime = stopFrame / frameRate; // 停止したい時間を計算

        if (action.time >= stopTime) {
          action.paused = true; // アニメーションを一時停止
        }
      }
    }
  });

  return <primitive object={scene} scale={0.25} position={position} />;
};

export default ResultItem;
