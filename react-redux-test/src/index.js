import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";


// React Component
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.clickAction = this.clickAction.bind(this);
  }
  clickAction() {
    // ReducerにActionをディスパッチする
    this.props.dispatch({ type: "INCREMENT" });
    console.log("pushed button");
  }
  
  render() {
    return (
      <div>
        <button onClick={this.clickAction}>
          button
        </button>
        <div>
          { this.props.value }
        </div>
      </div>
    );
  }
};

// NewComponent = connect(Componentからdispatchされたアクション) (Component)
const App = connect(
  state => state
)(Container);


// Reducer
const reducer = (state = { value: 0 }, action) => {
  // Componentの中でディスパッチされたActionがaction変数に入ってくる
  // action = { type: "INCREMENT" }
  switch (action.type) {
    case "INCREMENT":
      // valueに+1して返す
      return Object.assign({}, { value: state.value + 1 });
    default:
      return state;
  }
};

// Reducerの戻り値を新しい状態（State）としてStoreで管理する
const store = createStore(reducer);

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById("root")
);
