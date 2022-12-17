import Weather from "./components/Weather";

function App() {
  return (
    <>
      <div
        className={`h-screen w-screen absolute bg-sunset bg-cover bg-no-repeat bg-center after:absolute after:w-screen after:h-screen after:backdrop-filter after:backdrop-brightness-50 after:backdrop-blur-xl`}
      ></div>
      <Weather />
    </>
  );
}

export default App;
