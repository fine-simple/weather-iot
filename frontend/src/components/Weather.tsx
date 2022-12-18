import { useEffect, useState } from "react";
import useTime from "../hooks/useTime";
import { FaCloudSun, FaWater } from "react-icons/fa";
import { RxHeight } from "react-icons/rx";
import { BsCloudHaze } from "react-icons/bs";
import Entry from "./Entry";

export default function Weather() {
  const [weather, setWeather] = useState({
    temp: -1,
    humidity: -1,
    pressure: -1,
    altitude: -1,
  });
  const [failed, setFailed] = useState(false);
  const time = useTime();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api")
        .then(data => data.json())
        .then(json => {
          setWeather(json.weather);
          setFailed(false);
        })
        .catch(() => {
          setFailed(true);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`h-screen w-screen m-auto relative z-10 flex flex-col text-white bg-sunset bg-cover bg-center lg:h-3/4 lg:w-3/4 lg:flex-row`}
    >
      <section className="w-full h-1/3 flex flex-col justify-end items-center pb-10 lg:h-full lg:justify-center backdrop-filter backdrop-brightness-75 backdrop-blur-sm">
        <h1 className="text-3xl">Cairo, Egypt</h1>
        <h2 className="font-semibold">{time.toDateString()}</h2>
        <h2 className="font-semibold">{time.toLocaleTimeString()}</h2>
        <div className="flex">
          <FaCloudSun size={80} />
          <h1 className="text-5xl font-semibold m-auto ml-2">
            {parseFloat(weather.temp.toFixed(2))}ºC
          </h1>
        </div>
      </section>
      <section className="h-full w-full bg-sky-600/20 backdrop-filter backdrop-blur-xl backdrop-brightness-[30%] lg:w-2/4 lg: p-5 pt-10">
        <main className="">
          <h2 className="text-xl font-semibold">Other details</h2>
          <hr />
          <div className="text-xl">
            <Entry
              title="Humidity"
              value={weather.humidity}
              unit="%"
              icon={FaWater}
            />
            <Entry
              title="Pressure"
              value={weather.pressure}
              unit="pa"
              icon={BsCloudHaze}
            />
            <Entry
              title="Altitude"
              value={weather.altitude}
              unit="m"
              icon={RxHeight}
            />
          </div>
        </main>
        <footer className="absolute left-0 w-full bottom-0">
          {failed && (
            <p className="text-red-600 text-center">
              Lost Connection to the server
            </p>
          )}
        </footer>
      </section>
    </div>
  );
}
