import React from "react";
import Header from "./components/header";
import Content from "./components/content";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="container">
          <div>
            <Header />
          </div>

          <div className="content">
            <Content />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
