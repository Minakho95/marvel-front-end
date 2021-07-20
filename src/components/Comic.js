import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useState, useEffect } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Comic = ({
  id,
  name,
  description,
  path,
  extension,
  cookie,
  setCookie,
}) => {
  const [open, setOpen] = useState(false);
  const checkIsFav = cookie.toString().indexOf(id) !== -1;

  const handleFav = () => {
    if (!checkIsFav) {
      const newCookie = cookie ? JSON.parse(cookie) : [];
      const charFav = {
        name: name,
        description: description,
        picture: `${path}.${extension}`,
        id: id,
        from: "comic",
      };
      newCookie.push(charFav);
      setCookie(JSON.stringify(newCookie));
      Cookies.set("favs", newCookie);
      setOpen(true);
    } else {
      const newCookie = JSON.parse(cookie);
      const found = newCookie.find((element) => element.id === id);
      if (found) {
        newCookie.splice(newCookie.indexOf(found), 1);
        setCookie(JSON.stringify(newCookie));
        Cookies.set("favs", newCookie);
        setOpen(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="card" key={id}>
      <div className="fav-star">
        <FontAwesomeIcon
          icon={checkIsFav ? fasFaStar : farFaStar}
          onClick={() => handleFav()}
        />
      </div>

      <img src={`${path}.${extension}`} alt="" />
      <div className="card-body">
        <h2>{name}</h2>
        {description ? <p>{description}</p> : <p>No description</p>}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {checkIsFav ? (
          <Alert onClose={handleClose} severity="success">
            {name} est maintenant dans les favoris !
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="warning">
            {name} n'est plus dans les favoris !
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default Comic;
