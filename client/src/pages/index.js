import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../Context/AuthContext";
import Home from "./Home";

import Search from "./Search";
import UserProfile from "./UserProfile";
import Layout from "../Layout/layout";
import AdminPanel from "./AdminPanel";
import SavedPets from "./savedPets";
const Router = (props) => {
  const { user } = useContext(UserContext);

  if (user.role === "user") {
    return (
      <Layout>
        <Switch>
          <Route exact path="/:loggedId" component={Home} />
          <Route exact path="/savedpets/:loggedId" component={SavedPets} />
          <Route exact path="/search/:loggedId" component={Search} />
          <Route exact path="/userprofile/:loggedId" component={UserProfile} />
        </Switch>
      </Layout>
    );
  } else if (user.role === "admin") {
    return (
      <Layout>
        <Switch>
          <Route exact path="/:loggedId" component={Home} />
          <Route path="/userprofile/:loggedId" component={UserProfile} />
          <Route path="/savedpets/:loggedId" component={SavedPets} />
          <Route path="/search/:loggedId" component={Search} />
          <Route path="/adminpanel/:loggedId" component={AdminPanel} />
        </Switch>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/savedpets" component={SavedPets} />
          <Route exact path="/search" component={Search} />
          <Redirect push to="/" />
        </Switch>
      </Layout>
    );
  }
};

export default Router;
