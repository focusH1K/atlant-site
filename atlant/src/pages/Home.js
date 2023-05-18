import React from "react";
import schk from "../img/schk.png";

const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <img src={schk} style={{ width: "80%" }} alt="Schk Image" />
    </div>
  );
}

export default Home;