// 初期化
(() => {
    document.body.innerHTML = `
    <button onclick="actionSetURL(document.getElementById('url').value)">Set</button>
    <button onclick="actionGetImg()">Get</button>
    <button onclick="actionClear()">Clear</button>
    <input id="url" type="text" style="width: 600px;" />
    <div id="render"></div>
  `;
})();

// Action
const actionSetURL = url => url && store.dispatch({ type: 'SET_URL', url });
const actionGetImg = () => store.dispatch({ type: 'GET_IMG' });
const actionClear = () => store.dispatch({ type: 'CLEAR' });

// Reducer
const reducerURL = (state = '', action) => {
  switch (action.type) {
    case 'SET_URL':
      return action.url;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
}
const reducerImg = (state = false, action) => {
  switch (action.type) {
    case 'GET_IMG':
      return true;
    case 'CLEAR':
      return false;
    default:
      return state;
  }
}


var aaa = function(reducers) {
  var bbb = function(state = {}, action) {
    var arr = Object.keys(reducers);
    var obj = arr.reduce(function(nextState, key) {
      nextState[key] = reducers[key](state[key],action);
      return nextState;
    }, {});
    
    return obj;
  };
  
  return bbb;
};
const rootReducer = aaa({ reducerURL:reducerURL, reducerImg:reducerImg });
console.log(rootReducer);
console.log(rootReducer(1,{type:'GET_IMG'}));

//// Reducerをまとめる
//const combineReducers = reducers => (state = {}, action) => Object.keys(reducers).reduce((nextState, key) => {
//  nextState[key] = reducers[key](state[key],action);
//  return nextState;
//}, {});
//
//const rootReducer = combineReducers({ reducerURL, reducerImg });

// Store, Provider, Render
const store = Redux.createStore(rootReducer); // storeの作成
const provider = state => {
  const stateView = `
    <div>
      <div>state.reducerURL: ${state.reducerURL}</div>
      <div>state.reducerImg: ${state.reducerImg}</div>
    </div>
  `;
  const imgView = state.reducerImg ? `<img src='${state.reducerURL}' />` : '';
  return `
    <div>
      ${stateView}
      ${imgView}
    </div>
  `;
}
const render = () => { document.getElementById('render').innerHTML = provider(store.getState()); }
store.subscribe(render);
render();


//プロバイダーが、Viewを生成する
//storeが、
//　・レデューサーを束ねている
//　・combineReducersrenderを保持する
//　・対応するアクションが

