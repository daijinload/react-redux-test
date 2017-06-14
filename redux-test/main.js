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

//// Reducerをまとめる
//const combineReducers = reducers => (state = {}, action) => Object.keys(reducers).reduce((nextState, key) => {
//  nextState[key] = reducers[key](state[key],action);
//  return nextState;
//}, {});
//
//const rootReducer = combineReducers({ reducerURL, reducerImg });


// 上記の書き方が謎すぎて、理解のためにバラしてES5で書いた。
// Reducerをまとめると書いてあるが、実態はReducersをクロージャで保持して、
// まとめて実行できる状態にして、実行するとstateオブジェクトを生成して返す関数を生成している。
// this.props.dispatch({ type: "INCREMENT" });を動かした時に動く関数を生成しているイメージ
var createExecAllReducersFunc = function(reducers) {
  var execAllReducersFunc = function(state = {}, action) {
    var arr = Object.keys(reducers);
    var stateObj = arr.reduce(function(nextState, key) {
      nextState[key] = reducers[key](state[key],action);
      return nextState;
    }, {});
    
    return stateObj;
  };
  
  return execAllReducersFunc;
};
const rootReducer = createExecAllReducersFunc({ reducerURL:reducerURL, reducerImg:reducerImg });
console.log(rootReducer);
console.log(rootReducer({}, {type:'GET_IMG'}));


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

