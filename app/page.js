"use client";

import { useEffect, useState } from "react";

const Camera = ({
  title,
  description,
  src,
  offline,
  underMaintenance,
  refreshKey,
}) => (
  <div>
    <h3 className="mb-2 leading-tight">{title}</h3>
    <img
      src={`https://www.trafficnz.info/camera/${src}.jpg?refreshKey=${refreshKey}`}
      alt={description}
      loading="lazy"
      className="aspect-video w-full rounded bg-gray-500/20 object-cover"
    />
  </div>
);

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, 20 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [allCameras, setAllCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);

    const filtered = allCameras
      .map((section) => ({
        ...section,
        images: section.images.filter(
          (camera) =>
            camera.Name.toLowerCase().includes(
              event.target.value.toLowerCase().trim()
            ) ||
            camera.Description.toLowerCase().includes(
              event.target.value.toLowerCase().trim()
            )
        ),
      }))
      .filter((section) => section.images.length > 0);

    setFilteredCameras(filtered);
  };

  useEffect(() => {
    const fetchCameras = async () => {
      const res = await fetch("/api/cameras");
      const data = await res.json();
      const formattedData = Object.entries(data).map(([section, images]) => ({
        section,
        images,
      }));
      setAllCameras(formattedData);
      setFilteredCameras(formattedData);
    };
    fetchCameras();
  }, []);

  return (
    <main className="p-5 md:p-10">
      <h1 className="mb-4 text-2xl font-bold">Auckland traffic cameras</h1>
      {allCameras.length > 0 && (
        <input
          type="text"
          placeholder="Search cameras..."
          value={searchString}
          onChange={handleSearchChange}
          className="mb-4 w-full rounded-md bg-white p-2 ring-1 ring-slate-500 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/80 dark:bg-slate-900"
        />
      )}
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
                  title={camera.Name}
                  description={camera.Description}
                  src={camera.ExternalId}
                  offline={camera.Offline}
                  underMaintenance={camera.UnderMaintenance}
                  refreshKey={refreshKey}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="py-2 text-lg opacity-60">
          {allCameras.length > 0 ? "No matches" : "Loading"}
        </div>
      )}
    </main>
  );
}
