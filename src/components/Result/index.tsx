import sytles from "./styles.module.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import ResultItem from "../ResultItem";
import { DailyActivity } from "../../types/DatabaseTypes";

type Props = {
  displayData: { data: []; date: Date }; // displayDataの型を適切に定義する
};

const Result: React.FC<Props> = ({ displayData }) => {
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
            {displayData && <ResultItems displayData={displayData} />}
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

const formatData = (data: DailyActivity[]) => {
  const formattedData: { [key: string]: DailyActivity[] } = {};
  data.forEach((item: DailyActivity) => {
    if (typeof item.date === "string") {
      if (formattedData[item.date]) {
        formattedData[item.date].push(item);
      } else {
        formattedData[item.date] = [item];
      }
    }
  });
  return formattedData;
};

const getDateForMonthLength = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate(); // 月の最終日を取得
};

const getDataByDay = (itemCount: number[], displayData: any) => {
  // displayData.dateをYYYY-MM形式の文字列に変換
  const year = displayData.date.getFullYear();
  const month = (displayData.date.getMonth() + 1).toString().padStart(2, "0");
  const monthString = `${year}-${month}`;
  const datas = formatData(displayData.data);

  return itemCount.map((index) => {
    const day = (index + 1).toString().padStart(2, "0"); // 日付を2桁にフォーマット
    const key = `${monthString}-${day}`; // YYYY-MM-DD形式のキーを作成
    if (!datas[key]) {
      return []; // データがない場合は空の配列を設定
    } else {
      return datas[key];
    }
  });
};

const ResultItems = ({ displayData }: any) => {
  const dateLength = getDateForMonthLength(displayData.date);
  const { scene, animations } = useGLTF("/model/grass.glb"); // モデルを読み込む
  const itemCount = Array.from({ length: dateLength - 1 }, (_, index) => index);
  const planeSize = 8;
  const columns = 7; // 1行に配置するアイテム数
  const rows = Math.ceil(itemCount.length / columns); // 必要な行数
  const spacingX = planeSize / columns; // x方向の間隔
  const spacingZ = planeSize / rows; // z方向の間隔
  const datas = getDataByDay(itemCount, displayData); // 月の日付を取得

  return (
    <>
      {datas.map((data, index) => {
        const row = Math.floor(index / columns); // 行番号
        const col = index % columns; // 列番号

        // x, z の位置を計算 (-planeSize / 2 から planeSize / 2 の範囲内に配置)
        const x = col * spacingX - planeSize / 2 + spacingX / 2;
        const z = row * spacingZ - planeSize / 2 + spacingZ / 2;
        return (
          <ResultItem
            key={`result-item-${index}`} // 一意なキー
            position={[x, -0.05, z]} // 計算した位置
            displayFrameNumber={data.length * 10} // 表示するフレーム数
            scene={scene.clone()} // シーンを複製
            animations={animations.map((anim) => anim.clone())} // アニメーションを複製
          />
        );
      })}
    </>
  );
};

export default Result;
