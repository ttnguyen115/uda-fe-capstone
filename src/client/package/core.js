export default function html([first, ...strings], ...values) {
  return (
    values
      // split each string line to arrays
      .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
      // filter truthy values except 0 number type
      .filter((truthy) => (truthy && truthy !== true) || truthy === 0)
      // link arrays to string
      .join("")
  );
}

export function attach(component, root) {
  const roots = new Map();
  roots.set(root, component);
  for (const [root, component] of roots) {
    root.innerHTML = component();
  }
}

export function createStore(reducer) {
  let state = reducer(undefined, {});
  const subscribers = [];

  // export functions in store.js and using in components
  return {
    getState() {
      return state;
    },

    // Dispatch state to store (components <=> reducer.js)
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach((subscriber) => subscriber());
    },

    // As selector
    subscribe(subscriber) {
      subscribers.push(subscriber);
    },
  }
}
