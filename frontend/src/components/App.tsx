import React from "react";
import "styles/colors.scss";
import { Route, Switch } from "react-router";
import * as Pages from "pages";

function App() {
  return (
    <div className="App light">
      <Switch>
        <Route exact path="/" render={() => <Pages.Main />} />
        <Route path="/signin" render={() => <Pages.SignIn />} />
        <Route exact path="/signup" render={() => <Pages.SignUp />} />
        <Route path="/signup/email" render={() => <Pages.InsertEmail />} />
        <Route path="/signup/verify" render={() => <Pages.VerifyEmail />} />
        <Route path="/signup/auth" render={() => <Pages.LocalAuth />} />
        <Route path="/github/auth" render={() => <Pages.GitHubAuth />} />
      </Switch>
    </div>
  );
}

export default App;
