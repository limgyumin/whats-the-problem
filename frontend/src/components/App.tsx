import React from "react";
import "styles/colors.scss";
import { Route, Switch } from "react-router";
import * as Pages from "pages";

function App() {
  return (
    <div className="App light">
      <Switch>
        <Route exact path="/" render={() => <Pages.Main />} />
      </Switch>
    </div>
  );
}

export default App;
