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
  let data;
  const context = {
    dispatch: ({ type, payload }) => {
      data = payload;
    },
    state: { users }
  };

  mockAxios.get.mockResolvedValue({
    data: {
      users
    }
  });

  it("should mount the component", async () => {
    const res = await fetchUsers({ context });

    const wrapper = shallow(
      <MemoryRouter>
        <App>
          <Route path="/">
            <Users />
          </Route>
        </App>
      </MemoryRouter>
    );

    expect(res).not.toEqual(users);
  });
});
