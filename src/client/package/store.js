import { createStore } from "./core.js";
import withLogger from './logger.js';
import logger from "./temp";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const { attach, dispatch } = createStore(withLogger(reducer));

window.dispatch = dispatch;

const store = (window.store = createStore(logger(reducer)));

export {
  attach,
}