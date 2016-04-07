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

function lastAction(state, action) {
  return _extends({}, state, { lastAction: action.type });
}

function handleOperation(state, action) {
  if (state.lastAction == 'EQUAL') {
    var myFun = function myFun(a) {
      return action.func(state.originalFunc(state.number), a);
    };
    return _extends({}, state, {
      operation: action.func,
      storedFunc: myFun,
      number: state.number
    });
  } else if (state.lastAction == 'OPERATION') {
    var myFun = function myFun(a) {
      return action.func(state.number, a);
    };
    return _extends({}, state, {
      operation: action.func,
      storedFunc: myFun,
      number: state.number
    });
  }
  var myFun = function myFun(a) {
    return action.func(state.storedFunc(state.number), a);
  };
  return _extends({}, state, {
    operation: action.func,
    originalFunc: state.storedFunc,
    storedFunc: myFun,
    number: state.storedFunc(state.number)
  });
}

function handleEqual(state, action) {
  if (state.lastAction !== 'EQUAL') {
    var myFun = function myFun(a) {
      return state.operation(a, state.number);
    };

    return _extends({}, state, {
      storedFunc: myFun,
      number: state.storedFunc(state.number)
    });
  } else {
    return _extends({}, state, {
      number: state.storedFunc(state.number)
    });
  }
}

function help(state, action) {

  var initialState = {
    number: 0,
    storedFunc: function storedFunc(x) {
      return x;
    }
  };

  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case "TYPE":
      var number = state.number;
      if (state.lastAction !== 'TYPE') {
        number = 0;
      }
      return _extends({}, state, { number: 10 * number + action.number });
    case 'CLEAN':
      return initialState;
    case 'CHANGE_SIGN':
      if (state.lastAction === 'OPERATION') {
        return _extends({}, state, { number: 0 });
      } else if (state.lastAction === 'EQUAL') {
        return _extends({}, state, { number: -state.number, storedFunc: function storedFunc(x) {
            return x;
          } });
      }

      return _extends({}, state, { number: -state.number });
    case "OPERATION":
      return handleOperation(state, action);
    case "EQUAL":
      return handleEqual(state, action);

    default:
      return state;
  }
}
function calculator(state, action) {
  console.log('before');
  console.log(state);
  var ret = lastAction(help(state, action), action);
  console.log('after');
  console.log(ret);
  return ret;
}

var store = Redux.createStore(calculator);
function render() {
  var el = document.getElementById('screen');
  el.innerHTML = store.getState().number;
}

store.subscribe(render);
ons.ready(render);

var type = function type(number) {
  return store.dispatch({ type: 'TYPE', number: number });
};

var clean = function clean() {
  return store.dispatch({ type: 'CLEAN' });
};

var changeSign = function changeSign() {
  return store.dispatch({ type: 'CHANGE_SIGN' });
};
var mod = function mod() {
  return store.dispatch({ type: 'OPERATION', func: function func(a, b) {
      return a % b;
    } });
};
var divide = function divide() {
  return store.dispatch({ type: 'OPERATION', func: function func(a, b) {
      return Math.floor(a / b);
    } });
};
var plus = function plus() {
  return store.dispatch({ type: 'OPERATION', func: function func(a, b) {
      return a + b;
    } });
};
var minus = function minus() {
  return store.dispatch({ type: 'OPERATION', func: function func(a, b) {
      return a - b;
    } });
};
var multiply = function multiply() {
  return store.dispatch({ type: 'OPERATION', func: function func(a, b) {
      return a * b;
    } });
};
var equal = function equal() {
  return store.dispatch({ type: 'EQUAL', func: function func(a, b) {
      return b;
    } });
};

