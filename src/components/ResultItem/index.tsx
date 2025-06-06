import sytles from "./styles.module.scss";
import { useEffect, useMemo } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Mesh, SkinnedMesh } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React from "react";

type ResultItemProps = {
  position?: [number, number, number];
  displayFrameNumber?: number; // フレーム番号を受け取る
  scene: THREE.Group<THREE.Object3DEventMap>; // シーンを受け取る
  animations: THREE.AnimationClip[]; // アニメーションを受け取る
};

const ResultItem: React.FC<ResultItemProps> = ({
  position,
  displayFrameNumber = 0,
  scene,
  animations,
}) => {
  const memoizedScene = useMemo(() => scene.clone(), [scene]);

  const memoizedAnimations = useMemo(
    () => animations.map((anim) => anim.clone()),
    [animations]
  );

  const { actions } = useAnimations(memoizedAnimations, memoizedScene);

  memoizedScene.traverse((child) => {
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
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
        action.play();
      }
    }
  }, [actions, displayFrameNumber]);

  useFrame(() => {
    if (actions) {
      const action = actions[Object.keys(actions)[0]];
      if (action && action.isRunning()) {
        const frameRate = 24;
        const stopFrame = displayFrameNumber;
        const stopTime = stopFrame / frameRate;

        if (action.time >= stopTime) {
          action.paused = true;
        }
      }
    }
  });

  return <primitive object={memoizedScene} scale={0.25} position={position} />;
};

// Custom comparison function to prevent unnecessary re-renders
const areEqual = (prevProps: ResultItemProps, nextProps: ResultItemProps) => {
  if (prevProps.position && nextProps.position) {
    return (
      prevProps.position?.[0] === nextProps.position?.[0] &&
      prevProps.position?.[1] === nextProps.position?.[1] &&
      prevProps.position?.[2] === nextProps.position?.[2] &&
      prevProps.displayFrameNumber === nextProps.displayFrameNumber
    );
  } else {
    return false;
  }
};

export default React.memo(ResultItem, areEqual);
