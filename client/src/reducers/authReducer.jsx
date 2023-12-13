import { ACTIONS} from '../constants/authConstants';
function authReducer(state, action) {
    switch (action.type) {
      case ACTIONS.LOGIN:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          role: action.payload.role,
        };
      case ACTIONS.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          role: null,
        };
      case ACTIONS.REGISTER:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          role: action.payload.role,
        };
      default:
        return state;
    }
  };

  export default authReducer;