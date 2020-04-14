
export function createReducer(initialState, handlers) {
    return (state = initialState, action = {}) => {
      const handler = handlers[action.type];
      if (!handler) return state;
      const newState = handler(state, action);
      // console.log('createReducer', action.type, action, newState);
      if (newState === false) return state;
      return { ...state,
        ...newState
      };
    };
  }