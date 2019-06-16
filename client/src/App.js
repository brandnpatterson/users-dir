import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Context } from "./context";
import { fetchUsers } from "./context/api";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import AddUser from "./pages/AddUser";
import ThankYou from "./pages/ThankYou";

function App() {
  const context = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetchUsers({ context });
    }

    setLoading(false);
  }, [context, loading]);

  return (
    <StyledApp>
      <Header />
      <Switch>
        <Route exact path="/" component={Users} />
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/:userId" component={EditUser} />
        <Route path="/thank-you" component={ThankYou} />
      </Switch>
      <Footer />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  margin: 0 auto;
  max-width: 80%;
`;

export default App;
