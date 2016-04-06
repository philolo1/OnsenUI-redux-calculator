'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var mod_func = function mod_func(a, b) {
  return a % b;
};
var div_func = function div_func(a, b) {
  return Math.floor(a / b);
};
var mult_func = function mult_func(a, b) {
  return a * b;
};
var plus_func = function plus_func(a, b) {
  return a + b;
};
var minus_func = function minus_func(a, b) {
  return a - b;
};

function help(state, action) {
  var initialState = {
    storedNumber: 0,
    storedAction: function storedAction(a, b) {
      return b;
    },
    currentNumber: 0,
    swapNext: false
  };

  if (typeof state === 'undefined') {
    return initialState;
  }

  var newState = state;

  switch (action.type) {
    case 'TYPE':
      if (state.swapNext) {
        newState.storedNumber = state.currentNumber;
        newState.currentNumber = 0;
        newState.swapNext = false;
      }
      return _extends({}, newState, { currentNumber: newState.currentNumber * 10 + action.number });
    case 'CHANGE_SIGN':
      return _extends({}, newState, { currentNumber: -newState.currentNumber });
    case 'CLEAN':
      return initialState;
    case 'OPERATION':
      return _extends({}, newState, { storedAction: action.func,
        storedNumber: newState.currentNumber,
        currentNumber: newState.storedAction(newState.storedNumber, newState.currentNumber), swapNext: true });
    case 'EQUAL':
      return _extends({}, newState, { storedAction: action.func, currentNumber: newState.storedAction(newState.storedNumber, newState.currentNumber), swapNext: true });
    default:
      return state;
  }

  return newState;
}
function calculator(state, action) {
  console.log('before');
  console.log(state);
  var ret = help(state, action);
  console.log('after');
  console.log(ret);
  return ret;
}

var store = Redux.createStore(calculator);
function render() {
  var el = document.getElementById('screen');
  el.innerHTML = store.getState().currentNumber;
}

store.subscribe(render);
ons.ready(render);

var type = function type(number) {
  store.dispatch({ type: 'TYPE', number: number });
};

var clean = function clean(number) {
  store.dispatch({ type: 'CLEAN' });
};

var changeSign = function changeSign() {
  return store.dispatch({ type: 'CHANGE_SIGN' });
};
var mod = function mod() {
  return store.dispatch({ type: 'OPERATION', func: mod_func });
};
var divide = function divide() {
  return store.dispatch({ type: 'OPERATION', func: div_func });
};
var plus = function plus() {
  return store.dispatch({ type: 'OPERATION', func: plus_func });
};
var minus = function minus() {
  return store.dispatch({ type: 'OPERATION', func: minus_func });
};
var multiply = function multiply() {
  return store.dispatch({ type: 'OPERATION', func: mult_func });
};
var equal = function equal() {
  return store.dispatch({ type: 'EQUAL', func: function func(a, b) {
      return b;
    } });
};

