import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <Provider store={store}>
      <Navbar/>
      <Dashboard />
    </Provider>
  );
};

export default App;
