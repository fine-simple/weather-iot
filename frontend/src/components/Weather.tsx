import React, { useEffect, useId, useState } from "react";
import useTime from "../hooks/useTime";
import { FaCloudSun, FaWater } from "react-icons/fa";
import { RxHeight } from "react-icons/rx";
import { BsCloudHaze } from "react-icons/bs";
import Entry from "./Entry";
import TempLoader from "./TempLoader";
import Input from "./Input";
import axios from "axios";
import TextArea from "./TextArea";

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: null,
    humidity: null,
    pressure: null,
    altitude: null,
  });

  const [email, setEmail] = useState("");

  const [thresholds, setThresholds] = useState<ThresholdsData>({
    temp: "",
    humidity: "",
    pressure: "",
    altitude: "",
  });

  const [failed, setFailed] = useState(false);
  const time = useTime();

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("/api")
        .then(res => {
          setWeather(res.data.weather);
          setFailed(false);
        })
        .catch(() => {
          setFailed(true);
        });
    }, 1000);

    axios
      .get("/thresholds")
      .then(({ data }) => {
        setThresholds(data);
      })
      .catch(() => {
        setThresholds(old => {
          const newData = { ...old };
          Object.keys(old).forEach(k => {
            old[k as keyof ThresholdsData] = -1;
          });
          return newData;
        });
      });

    axios
      .get("/email")
      .then(({ data }) => setEmail(data))
      .catch(e => console.log(e));
    return () => {
      clearInterval(interval);
    };
  }, []);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    axios.post("/email", { email: email.replaceAll("\n", ",") }).catch(e => {
      console.log(e);
    });

    if (Object.values(thresholds).find(v => !v)) return;

    axios.post("/thresholds", thresholds).catch(e => {
      console.log(e);
    });
  };

  const thresholdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThresholds(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className={`h-screen w-screen m-auto relative z-10 flex flex-col text-white bg-sunset bg-cover bg-center lg:h-3/4 lg:w-3/4 lg:flex-row`}
    >
      <section className="w-full h-1/3 flex flex-col justify-end items-center pb-10 lg:h-full lg:justify-center backdrop-filter backdrop-brightness-75 backdrop-blur-sm">
        <h1 className="text-3xl">Cairo, Egypt</h1>
        <h2 className="font-semibold">{time.toDateString()}</h2>
        <h2 className="font-semibold">{time.toLocaleTimeString()}</h2>
        <div className="flex justify-center gap-x-4">
          <FaCloudSun className="scale-x-[-1]" size={80} />
          {(weather.temp && (
            <h1 className="text-5xl font-semibold m-auto ml-2">
              {parseFloat(weather.temp.toFixed(2))}ºC
            </h1>
          )) || <TempLoader />}
        </div>
      </section>
      <section className="h-full flex flex-col overflow-y-auto w-full bg-sky-600/20 backdrop-filter backdrop-blur-xl backdrop-brightness-[30%] lg:w-2/4 lg: p-5 pt-10">
        <main className="flex flex-col">
          <article>
            <h2 className="text-xl font-semibold">Other details</h2>
            <hr className="mb-6" />
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
          </article>
          <article>
            <h2 className="text-xl font-semibold">Options</h2>
            <hr className="mb-6" />
            <form onSubmit={submitHandler} className="text-xl flex flex-col">
              <TextArea
                name="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setEmail(e.target.value);
                }}
                label="Email Receiver(s)"
              />
              <Input
                name="temp"
                value={thresholds.temp}
                onChange={thresholdChangeHandler}
                label="Temp Threshold"
                type="number"
              />
              <Input
                name="humidity"
                value={thresholds.humidity}
                onChange={thresholdChangeHandler}
                label="Humidity Threshold"
                type="number"
              />
              <Input
                name="pressure"
                value={thresholds.pressure}
                onChange={thresholdChangeHandler}
                label="Pressure Threshold"
                type="number"
              />
              <Input
                name="altitude"
                value={thresholds.altitude}
                onChange={thresholdChangeHandler}
                label="Altitude Threshold"
                type="number"
              />
              <input
                type="submit"
                className="text-white cursor-pointer w-15 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                value="Update"
              />
            </form>
          </article>
        </main>
        <footer className="mt-3">
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
