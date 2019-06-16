export const FETCH_USERS = "FETCH_USERS";
export const FILTER_USER = "FILTER_USER";
export const FILTER_USERS = "FILTER_USERS";
export const FLASH_MESSAGE = "FLASH_MESSAGE";
export const REDIRECT_STATUS = "REDIRECT_STATUS";
export const LOADING_STATUS = "LOADING_STATUS";

export const actions = {
  [FETCH_USERS]: (state, action) => ({
    ...state,
    users: [...action.payload]
  }),
  [FILTER_USER]: (state, action) => ({
    ...state,
    userSingle: action.payload
  }),
  [FILTER_USERS]: (state, action) => ({
    ...state,
    usersFiltered: action.payload
  }),
  [FLASH_MESSAGE]: (state, action) => ({
    ...state,
    flashMessage: action.payload
  }),
  [REDIRECT_STATUS]: (state, action) => ({
    ...state,
    redirect: action.payload
  }),
  [LOADING_STATUS]: (state, action) => ({
    ...state,
    loading: action.payload
  })
};
