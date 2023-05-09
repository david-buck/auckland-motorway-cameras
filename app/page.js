"use client";

import Cameras from "@/json/cameras.json";
import { useEffect, useState } from "react";

const Camera = ({ title, src, refreshKey }) => (
  <div>
    <h3 className="mb-3">{title}</h3>
    <img
      src={`https://www.trafficnz.info/camera/${src}?refreshKey=${refreshKey}`}
      alt={title}
      loading="lazy"
      className="w-full"
    />
  </div>
);

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, 30 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold">Auckland traffic cameras</h1>
      {Cameras.map((section, index) => (
        <div key={index}>
          <h2 className="font-semibold text-lg sticky top-0 w-full bg-white py-2">
            {section.section}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {section.images.map((camera, idx) => (
              <Camera
                key={idx}
                title={camera.title}
                src={camera.src}
                refreshKey={refreshKey}
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
