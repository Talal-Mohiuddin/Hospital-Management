import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla modi
          nihil dignissimos placeat officia culpa molestias natus voluptate
          aliquid sapiente eius, fuga maiores odio quod, unde sed consectetur
          provident. Ea?Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Voluptatum saepe temporibus est eveniet provident beatae eius
          odit doloremque! Eligendi nisi hic eum labore aliquid odit dignissimos
          nesciunt, voluptates aut itaque.
        </p>
      </div>
      <div className="banner">
        <img className="animated-image" src={imageUrl} alt="" />
        <span>
          <img src="/Vector.png" alt="" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
