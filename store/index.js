import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default store = compose(applyMiddleware(thunk))(createStore)(rootReducer);

