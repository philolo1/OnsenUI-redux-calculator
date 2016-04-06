var mod_func = (a, b) => a % b;
var div_func = (a, b) => Math.floor(a / b);
var mult_func = (a, b) => a * b;
var plus_func = (a, b) => a + b;
var minus_func = (a, b) => a - b;

function help(state, action) {
  const initialState = {
    storedNumber: 0, 
    storedAction: (a, b) => b, 
    currentNumber: 0, 
    swapNext: false
  };

  if (typeof state === 'undefined') {
    return initialState;
  }

  let newState = state;
  
  switch (action.type) {
    case 'TYPE':
    if (state.swapNext) {
      newState.storedNumber = state.currentNumber;
      newState.currentNumber = 0;
      newState.swapNext = false;
    }
    return {...newState,  currentNumber: newState.currentNumber * 10 + action.number}
    case 'CHANGE_SIGN':
      return {...newState, currentNumber: -newState.currentNumber}
    case 'CLEAN': 
      return initialState
    case 'OPERATION':
      return {...newState, storedAction: action.func,
        storedNumber: newState.currentNumber, 
        currentNumber: newState.storedAction(newState.storedNumber, newState.currentNumber), swapNext: true}
    case 'EQUAL':
      return {...newState, storedAction: action.func, currentNumber: newState.storedAction(newState.storedNumber, newState.currentNumber), swapNext: true}
    default:
      return state
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

var store = Redux.createStore(calculator)
function render() {
  var el = document.getElementById('screen');
  el.innerHTML = store.getState().currentNumber    
}

store.subscribe(render)
ons.ready(render);


var type = function(number) {
  store.dispatch({type: 'TYPE', number});
}

var clean = function(number) {
  store.dispatch({type:'CLEAN'});
}

var changeSign = () =>   store.dispatch({type: 'CHANGE_SIGN'})
var mod = () => store.dispatch({type: 'OPERATION', func: mod_func });
var divide = () => store.dispatch({type: 'OPERATION', func: div_func});
var plus = () => store.dispatch({type: 'OPERATION', func: plus_func});
var minus = () => store.dispatch({type: 'OPERATION', func: minus_func});
var multiply = () => store.dispatch({type: 'OPERATION', func: mult_func});
var equal = () => store.dispatch({type: 'EQUAL', func: (a, b) => b});

