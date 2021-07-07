import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Favorite = ({ id, name, description, picture, from }) => {
  return (
    <div className="card">
      <img src={`${picture}`} alt="" />
      <div className="card-body">
        <h2>{name}</h2>
        {description ? <p>{description}</p> : <p>Pas de description</p>}
      </div>
    </div>
  );
};

export default Favorite;
