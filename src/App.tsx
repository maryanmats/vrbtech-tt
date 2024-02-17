import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { AppRoutes } from "./AppRouter";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
