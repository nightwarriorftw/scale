import React from "react";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px"}}>
      <img src={process.env.PUBLIC_URL + "/scale.png"}  width="100px" heigh="100px" alt='logo'/>
      <h1>Scale</h1>
      <h2>Host and Schedule Interviews</h2>
    </div>
  );
};

export default Home;
