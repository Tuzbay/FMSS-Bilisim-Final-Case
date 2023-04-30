import React from "react";
import "./navbar.scss";
import lightSide from "../../assets/lightSide.png";
import darkSide from "../../assets/darkSide.png";
import lego from "../../assets/lego.png";
import { Link } from "react-router-dom";

// Bu component ile navbar kısmı oluşturulmuştur.

function Navbar() {
  return (
    <div className="navbar">
      <img className="img" src={lightSide} alt="lego" />
      <Link to="/">
        <img className="logo" src={lego} alt="lego" />
      </Link>
      <img className="img" src={darkSide} alt="lego" />
    </div>
  );
}

export default Navbar;
