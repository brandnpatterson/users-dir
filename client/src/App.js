import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Context } from "./context";
import { fetchUsers } from "./context/api";

import Header from "./components/Header";

import Users from "./pages/Users";
import User from "./pages/User";
import EditUser from "./pages/EditUser";
import AddUser from "./pages/AddUser";
import ThankYou from "./pages/ThankYou";

function App() {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetchUsers({ context });

      setLoading(false);
    }
  }, [context, loading]);

  return (
    <StyledApp>
      <Header />
      <Switch>
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/:username/edit" component={EditUser} />
        <Route path="/users/:username" component={User} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/" component={Users} />
      </Switch>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  margin: 0 auto;
  max-width: 45rem;
  width: 80%;
`;

export default App;
