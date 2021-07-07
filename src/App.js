import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Characters from "./containers/Characters";
import Favorites from "./containers/Favorites";
import CharacterComics from "./containers/CharacterComics";
import Comics from "./containers/Comics";
import Header from "./components/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, fasFaStar, farFaStar);

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/comics/:id">
          <CharacterComics />
        </Route>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/">
          <Characters />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
