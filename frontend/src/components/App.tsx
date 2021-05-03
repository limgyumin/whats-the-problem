import React from "react";
import "styles/theme.scss";
import { Route, Switch } from "react-router";
import * as Pages from "pages";
import RestrictRoute from "./Routes/RestrictRoute";

const App = () => {
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
        <Route
          path="/question/:user/:title"
          render={() => <Pages.Question />}
        />
        <RestrictRoute exact path="/write" render={() => <Pages.Write />} />
        <RestrictRoute
          exact
          path="/write/question"
          render={() => <Pages.WriteQuestion />}
        />
      </Switch>
    </div>
  );
};

export default App;
