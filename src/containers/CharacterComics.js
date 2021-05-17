import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const CharacterComics = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-michaels.herokuapp.com/comics/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>Chargement...</span>
  ) : (
    <div>
      <div>
        <div className="char-comics">
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt=""
          />
          <h1>{data.name}</h1>
          <p> Ce personnage apparait dans :</p>
        </div>

        <div className="char-comics-list">
          {data.comics.map((comic, i) => {
            return (
              <div className="char-comic-card">
                <div className="comic-img">
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt=""
                  />
                </div>
                <p>{comic.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CharacterComics;
