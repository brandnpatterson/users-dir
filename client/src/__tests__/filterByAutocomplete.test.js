import React from "react";
import { filterByAutocomplete } from "../context/api";
import { users } from "../__mockData__";

describe("filter by single user", () => {
  let filtered;

  const context = {
    dispatch: ({ type, payload }) => {
      filtered = payload;
    },
    state: { users }
  };

  it("should filter users by value of filter input", () => {
    const radio = "firstname";
    const filterInput = "mic";

    filterByAutocomplete({ context, filterInput, radio });

    expect(filtered).toEqual([users[0], users[3]]);
  });
});
