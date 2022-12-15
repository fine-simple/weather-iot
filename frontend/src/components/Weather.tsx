import { useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState({
    Tempreture: 20,
    Humidity: 30,
    Pressure: 1,
    Altitude: 30,
  });

  return (
    <div
      className={`h-screen w-screen relative z-10 flex flex-col text-white bg-sunset bg-cover bg-center lg:h-2/3 lg:w-2/3 lg:m-auto lg:flex-row`}
    >
      <section className="w-full pb-10 h-1/3 flex items-end justify-center lg:h-full lg:justify-start">
        <article className="grid grid-cols-3 auto-cols-auto grid-rows-2">
          <h1 className="row-span-2 m-auto text-4xl text-center font-semibold">
            16º
          </h1>
          <h2 className="">Cairo</h2>
          <h2 className="row-span-2 pl-2 text-2xl m-auto">Cloudy</h2>
          <h2>{new Date().toLocaleTimeString()}</h2>
        </article>
      </section>
      <section className="h-screen w-full p-5 backdrop-filter backdrop-blur-md backdrop-brightness-50 backdrop-saturate-50 lg:w-3/5">
        <p className="text-xl font-semibold">Weather Details</p>
        {Object.entries(weather).map(([title, value]) => (
          <div key={title} className="flex justify-between p-2">
            <p>{title}</p>
            <p>{value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
