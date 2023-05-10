"use client";

import Cameras from "@/json/cameras.json";
import { useEffect, useState } from "react";

const Camera = ({ title, description, src, refreshKey }) => (
  <div>
    <h3 className="mb-2">{title}</h3>
    <img
      src={`https://www.trafficnz.info/camera/${src}?refreshKey=${refreshKey}`}
      alt={description}
      loading="lazy"
      className="aspect-video w-full rounded object-cover"
    />
  </div>
);

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, 30 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [filteredCameras, setFilteredCameras] = useState(Cameras);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
    const filtered = Cameras.map((section) => ({
      ...section,
      images: section.images.filter(
        (camera) =>
          camera.title
            .toLowerCase()
            .includes(event.target.value.toLowerCase().trim()) ||
          camera.description
            .toLowerCase()
            .includes(event.target.value.toLowerCase().trim())
      ),
    })).filter((section) => section.images.length > 0);

    setFilteredCameras(filtered);
  };

  return (
    <main className="p-5 md:p-10">
      <h1 className="mb-4 text-2xl font-bold">Auckland traffic cameras</h1>
      <input
        type="text"
        placeholder="Search cameras..."
        value={searchString}
        onChange={handleSearchChange}
        className="mb-4 w-full rounded-md bg-white p-2 ring-1 ring-slate-500 focus:outline-none focus-visible:ring dark:bg-slate-900"
      />
      {filteredCameras.length > 0 ? (
        filteredCameras.map((section, index) => (
          <div key={index}>
            <h2 className="sticky top-0 mb-2 w-full bg-white py-2 text-lg font-semibold dark:bg-slate-900 dark:text-white">
              {section.section}
            </h2>

            <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {section.images.map((camera, idx) => (
                <Camera
                  key={idx}
                  title={camera.title}
                  description={camera.description}
                  src={camera.src}
                  refreshKey={refreshKey}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <>No matches</>
      )}
    </main>
  );
}
