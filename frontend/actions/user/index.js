export const requestUser = userId => ({
  type: "REQUEST_USER",
  payload: userId
});

export const receiveUser = user => ({
  type: "RECEIVE_USER",
  payload: user
});