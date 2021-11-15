import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comic from "../components/Comic";
import Paginate from "../components/Paginate";
import Loader from "../components/Loader";

const Comics = () => {
  const [data, setData] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState();
  const [cookie, setCookie] = useState(Cookies.get("favs") || 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-michaels.herokuapp.com/comics`,
          {
            params: {
              limit: limit,
              skip: skip,
              ...(title ? { title: title } : {}),
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
  }, [title, skip]);

  const handleSearch = (event) => {
    setTitle(event.target.value);
    setSkip(0);
  };

  return isLoading ? (
    <>
      <Loader />
    </>
  ) : (
    <div>
      <h1>Liste de comics Marvel</h1>
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
            <Comic
              id={comics._id}
              name={comics.title}
              description={comics.description}
              path={comics.thumbnail.path}
              extension={comics.thumbnail.extension}
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

export default Comics;
