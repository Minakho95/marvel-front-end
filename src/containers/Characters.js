import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const [skip, setSkip] = useState(0);
  const [name, setName] = useState();

  useEffect(() => {
    const urlPram = name
      ? `https://marvel-michaels.herokuapp.com/characters?skip=${skip}&name=${name}`
      : `https://marvel-michaels.herokuapp.com/characters?skip=${skip}`;
    setUrl(urlPram);
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [url, name, skip]);

  const handleSearch = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const handleOnClickNext = () => {
    setSkip(skip + 9);
  };

  const handleOnClickPrev = () => {
    setSkip(skip - 9);
  };
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <div className="searchBar">
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

      <div className="container">
        {data.results.map((character, index) => {
          return (
            <div className="card">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt=""
              />
              <div className="card-body">
                <h2>{character.name}</h2>
                {character.description ? (
                  <p>{character.description}</p>
                ) : (
                  <p>No description</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {skip && (
          <input
            className="pagButton"
            type="button"
            value="Prev"
            onClick={handleOnClickPrev}
          />
        )}
        <span>{skip / 9}</span>
        {skip + data.limit < data.count && (
          <input
            className="pagButton"
            type="button"
            value="Next"
            onClick={handleOnClickNext}
          />
        )}
      </div>
    </div>
  );
};

export default Characters;
