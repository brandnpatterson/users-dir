import React from "react";
import { filterUserSingle } from "../context/api";
import { users } from "../__mockData__";

describe("filter by single user", () => {
  let filtered;

  const context = {
    dispatch: ({ type, payload }) => {
      filtered = payload;
    },
    state: { users }
  };

  it("should filter users by their username and return one user", () => {
    const username = "jhalpert";

    filterUserSingle({ context, username });

    expect(filtered).toEqual(users[1]);
  });

  it("should filter users by their username and return no users", () => {
    const username = "dwightkshrute";

    filterUserSingle({ context, username });

    expect(filtered).toEqual(undefined);
  });
});
