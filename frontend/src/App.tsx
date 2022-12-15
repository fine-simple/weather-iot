import Weather from "./components/Weather";

function App() {
  return (
    <>
      <div
        className={`h-screen w-screen fixed bg-sunset bg-cover bg-no-repeat bg-center brightness-50 after:fixed after:w-screen after:h-screen after:backdrop-filter after:backdrop-blur`}
      ></div>
      <Weather />
    </>
  );
}

export default App;
