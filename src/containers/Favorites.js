import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Favorite from "../components/Favorite";

const Favorites = () => {
  const [cookie, setCookie] = useState(Cookies.get("favs") || 0);
  const favList = JSON.parse(cookie);
  const hasComics = cookie.indexOf("comic") !== -1;
  const hasCharacter = cookie.indexOf("character") !== -1;

  return favList.length == 0 ? (
    <div className="empty-fav">
      <p>Pas de favoris</p>
    </div>
  ) : (
    <div>
      {hasCharacter && (
        <>
          {" "}
          <h1>Personnages favoris</h1>
          <div className="container">
            {favList.map((fav, index) => {
              return (
                fav.from === "character" && (
                  <Link
                    to={`/comics/${fav.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Favorite
                      id={fav.id}
                      name={fav.name}
                      description={fav.description}
                      picture={fav.picture}
                      from={fav.from}
                    />
                  </Link>
                )
              );
            })}
          </div>
        </>
      )}

      {hasComics && (
        <>
          <h1>Comics favoris</h1>
          <div className="container">
            {favList.map((fav, index) => {
              return (
                fav.from === "comic" && (
                  <Favorite
                    id={fav.id}
                    name={fav.name}
                    description={fav.description}
                    picture={fav.picture}
                    from={fav.from}
                  />
                )
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
