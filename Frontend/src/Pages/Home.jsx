import React from "react";
import { Biography, Hero, Department, Message } from "../components/index";

const Home = () => {
  return (
    <>
      <Hero title={"Welcome. Your Trusted Health Provider "} imageUrl={"/hero.png"} />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <Message />
    </>
  );
};

export default Home;
