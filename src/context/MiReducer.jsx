import types from './types.js';

const MiReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        logged: true,
        usuario: action.payload
      };
    case types.logout:
      return {
        logged: false,
        usuario: null
      };
    default:
      return state;
  }
};

export default MiReducer;