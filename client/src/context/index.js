import React, { useReducer } from "react";
import { actions } from "./actions";

const initialState = {
  loading: true,
  redirect: false,
  usersFiltered: null,
  userSingle: null,
  users: []
};

export const Context = React.createContext(initialState);

const isDev = process.env.NODE_ENV === "development";
const withDevTools = isDev && !!window && window.__REDUX_DEVTOOLS_EXTENSION__;
const devTools = withDevTools && window.__REDUX_DEVTOOLS_EXTENSION__.connect();

if (devTools) {
  devTools.send("@@INIT", initialState);
}

const reducer = (state, action) => {
  const newState = actions[action.type](state, action);

  if (devTools) {
    devTools.send(action.type, newState);
  }

  return newState;
};

const Provider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ dispatch, state }}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
