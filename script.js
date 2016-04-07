var mod_func = (a, b) => a % b;
var div_func = (a, b) => Math.floor(a / b);
var mult_func = (a, b) => a * b;
var plus_func = (a, b) => a + b;
var minus_func = (a, b) => a - b;


function lastAction(state, action) {
  return {...state, lastAction: action.type};
}

function handleOperation(state, action) {
  if ( state.lastAction == 'EQUAL') {
    var myFun =  (a) => action.func(state.originalFunc(state.number), a);
    return {
      ...state,
      operation: action.func, 
      storedFunc: myFun,
      number: state.number
    };
  }  else if (state.lastAction == 'OPERATION') {
    var myFun =  (a) => action.func(state.number, a);
    return {
      ...state,
      operation: action.func, 
      storedFunc: myFun,
      number: state.number
    };

  }
  var myFun =  (a) => action.func(state.storedFunc(state.number), a);
  return {
    ...state,
    operation: action.func, 
    originalFunc: state.storedFunc,
    storedFunc: myFun,
    number: state.storedFunc(state.number)
  };
}

function handleEqual(state, action) {
  if (state.lastAction !== 'EQUAL') {
    var myFun =  (a) => {
      return state.operation(a, state.number);
    }

    return {
      ...state,
      storedFunc: myFun,
      number: state.storedFunc(state.number)
    };
  } else {
    return {
      ...state,
      number: state.storedFunc(state.number)
    };

  }
}


function help(state, action) {

  
  const initialState = {
    number: 0,
    storedFunc: (x) => x,
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
      return {...state, number: 10 * number + action.number};
    case 'CLEAN':
      return initialState; 
    case 'CHANGE_SIGN':
      if (state.lastAction === 'OPERATION' ) {
        return {...state, number: 0}
      } else if (state.lastAction === 'EQUAL') {
        return {...state, number: -state.number, storedFunc: (x) => x}
      }

      return {...state, number: -state.number}
    case "OPERATION":
      return handleOperation(state, action);
    case "EQUAL":
      return handleEqual(state, action);
      
          default:
      return state
  }
}
function calculator(state, action) {
  console.log(state);
  var ret = Redux.combineReducers(lastAction, help);
  console.log('after');
  return ret;
}

var store = Redux.createStore(calculator)
function render() {
  var el = document.getElementById('screen');
  el.innerHTML = store.getState().number
}

store.subscribe(render)
ons.ready(render);


var changeSign = () =>   store.dispatch({type: 'CHANGE_SIGN'})
var clean = () => store.dispatch({type:'CLEAN'})
var divide = () => store.dispatch({type: 'OPERATION', func: (a, b) => Math.floor(a / b) });
var equal = () => store.dispatch({type: 'EQUAL', func: (a, b) => b});
var minus = () => store.dispatch({type: 'OPERATION', func: (a, b) => a - b});
var mod = () => store.dispatch({type: 'OPERATION', func: (a, b) => a % b });
var multiply = () => store.dispatch({type: 'OPERATION', func: (a, b) => a * b});
var plus = () => store.dispatch({type: 'OPERATION', func: (a, b) => a + b});
var type = (number) => store.dispatch({type: 'TYPE', number});
