function createStore(reducer) {
  let state = reducer(undefined, {});
  const subscribers = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach((subscriber) => subscriber());
    },
    subscribe(subscriber) {
      subscribers.push(subscriber);
    },
  };
}

const bankInitialState = 0;
function bankReducer(state = bankInitialState, action) {
  switch (action.type) {
    case "DEPOSIT":
      return state + action.payload;
    case "WITHDRAW":
      return state - action.payload;
    default:
      return state;
  }
}

const historyInitialState = [];
function historyReducer(state = historyInitialState, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [...state, action.payload];
    default:
      return state;
  }
}

const bankStore = (window.bankStore = createStore(logger(bankReducer)));
const historyStore = (window.historyStore = createStore(logger(historyReducer)));

function actionDeposit(payload) {
  return {
    type: "DEPOSIT",
    payload,
  };
}
function actionWithdraw(payload) {
  return {
    type: "WITHDRAW",
    payload,
  };
}

function actionAddTransaction(payload) {
  return {
    type: "ADD_TRANSACTION",
    payload,
  };
}

// DOM events
const depositBtn = document.getElementById("deposit");
const withdrawBtn = document.getElementById("withdraw");
// Event handlers
depositBtn.onclick = function () {
  bankStore.dispatch(actionDeposit(10));
  historyStore.dispatch(actionAddTransaction("Deposit 10"));
};
withdrawBtn.onclick = function () {
  bankStore.dispatch(actionWithdraw(10));
  historyStore.dispatch(actionAddTransaction("Withdraw 10"));
};
// Listener
bankStore.subscribe(() => {
  render1();
});
historyStore.subscribe(() => {
  render2();
});

function render1() {
  const output = document.querySelector("#output");
  output.innerText = bankStore.getState();
}
render1();

function render2() {
  const output = document.querySelector("#history");
  output.innerText = historyStore.getState();
}
render2();

export default function logger(reducer) {
  return (prevState, action) => {
    console.group(action);
    console.log('prevState: ', prevState);
    const nextState = reducer(prevState, action);
    console.log('nextState: ', nextState);
    console.groupEnd();
    return nextState;
  }
}