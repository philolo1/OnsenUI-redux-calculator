var mod_func = (a, b) => a % b;
var div_func = (a, b) => Math.floor(a / b);
var mult_func = (a, b) => a * b;
var plus_func = (a, b) => a + b;
var minus_func = (a, b) => a - b;


function lastAction(state, action) {

  console.log(action.type);
  return {...state, lastAction: action.type};
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
      if (state.lastAction == 'OPERATION' || state.lastAction == 'EQUAL') {
        var myFun =  (a) => action.func(state.originalFunc(state.number), a);
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
    case "EQUAL":
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

          default:
      return state
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

var store = Redux.createStore(calculator)
function render() {
  var el = document.getElementById('screen');
  el.innerHTML = store.getState().number
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

