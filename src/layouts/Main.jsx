import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../../helpers";

// components
import Nav from "../components/Nav";

// assets
import wave from "../assets/wave.svg";
import Footer from "../components/Footer";

export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className="layout">
      {userName && <Nav userName={userName} />}
      <main>
        <Outlet />
      </main>
      <img src={wave} />
      <Footer />
    </div>
  );
};

export default Main;