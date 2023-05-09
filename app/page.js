import Cameras from "@/json/cameras.json";

const Camera = ({ title, src }) => (
  <div>
    <h3 className="mb-3">{title}</h3>
    <img
      src={`https://www.trafficnz.info/camera/${src}`}
      alt={title}
      loading="lazy"
      className="w-full"
    />
  </div>
);

export default function Home() {
  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold">Auckland traffic cameras</h1>
      {Cameras.map((section, index) => (
        <div key={index}>
          <h2 className="font-semibold text-lg sticky top-0 w-full bg-white py-2">
            {section.section}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10">
            {section.images.map((camera, idx) => (
              <Camera key={idx} title={camera.title} src={camera.src} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
