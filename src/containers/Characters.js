import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Character from "../components/Character";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState();
  const [limit, setLimit] = useState(8);
  const [skip, setSkip] = useState(0);
  const [name, setName] = useState();
  const [cookie, setCookie] = useState(Cookies.get("favs") || 0);
  const parsed = JSON.parse(cookie);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-michaels.herokuapp.com/characters`,
          {
            params: {
              limit: limit,
              skip: skip,
              ...(name ? { name: name } : {}),
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [name, cookie, skip]);

  const handleSearch = (event) => {
    setName(event.target.value);
    setSkip(0);
  };

  return isLoading ? (
    <>
      <Loader />
    </>
  ) : (
    <div>
      <div>
        <h1>Liste de personnages Marvel</h1>
      </div>
      {/* SEARCHBAR */}
      <div className="searchBar" id="search">
        <span>
          <FontAwesomeIcon icon="search" />
        </span>
        <input
          className="searchInput"
          type="text"
          onChange={handleSearch}
          placeholder="Ton Héros préféré..."
        />
      </div>

      {/* CHARACTER LIST */}
      <div className="container">
        {data.results.map((character, index) => {
          return (
            <Character
              id={character._id}
              name={character.name}
              description={character.description}
              path={character.thumbnail.path}
              extension={character.thumbnail.extension}
              cookie={cookie}
              setCookie={setCookie}
            />
          );
        })}
      </div>

      {/* PAGINATION */}
      <Paginate skip={skip} setSkip={setSkip} data={data} />
    </div>
  );
};

export default Characters;
