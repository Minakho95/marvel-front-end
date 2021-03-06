import logo from "../marvel-logo.png";
import { Link } from "react-router-dom";
const Header = ({ isLoading }) => {
  return (
    <div className={isLoading ? "header-none" : null}>
      <div className="header">
        <Link to="/">
          <div className="logo-header">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className="menu">
          <ul>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>Personnages</li>
            </Link>

            <Link to="/comics" style={{ textDecoration: "none" }}>
              {" "}
              <li>Comics</li>
            </Link>

            <Link to="/favorites" style={{ textDecoration: "none" }}>
              {" "}
              <li>Favoris</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
