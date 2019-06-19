import React, { useContext } from "react";
import { Context } from "../context";
import App from "../App";
import Users from "../pages/Users";
import { MemoryRouter, Route } from "react-router";
import { shallow } from "enzyme";
import mockAxios from "axios";
import { users } from "../__mockData__";
import { fetchUsers } from "../context/api";

describe("<App />", () => {
  mockAxios.get.mockResolvedValue({
    data: {
      users
    }
  });

  it("should mount the component", async () => {
    let data;
    const FETCH_USERS = "FETCH_USERS";
    const context = {
      dispatch: ({ type, payload }) => {
        data = payload;
      },
      state: { users }
    };

    await fetchUsers({ context });

    const wrapper = shallow(
      <MemoryRouter>
        <App>
          <Route path="/">
            <Users />
          </Route>
        </App>
      </MemoryRouter>
    );

    if (data.type === FETCH_USERS) {
      expect(data).toEqual(users);
    } else {
      expect(data).toEqual(false);
    }
  });
});
