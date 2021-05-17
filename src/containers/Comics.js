import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlPram = title
          ? `https://marvel-michaels.herokuapp.com/comics?title=${title}`
          : `https://marvel-michaels.herokuapp.com/comics`;
        setUrl(urlPram);
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [url, title]);

  const handleSearch = (event) => {
    setTitle(event.target.value);
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
          placeholder="Ton comic préféré..."
        />
      </div>
      <div className="container">
        {data.results.map((comics, index) => {
          return (
            <div className="card">
              <img
                src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                alt=""
              />
              <div className="card-body">
                <h2>{comics.title}</h2>
                {comics.description ? (
                  <p>{comics.description}</p>
                ) : (
                  <p>No description</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
