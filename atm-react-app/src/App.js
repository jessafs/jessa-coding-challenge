import "./App.css";
import * as React from "react";

import Dashboard from "./components/dashboard";
function App() {
  return (
    <div className="container">
      <h2 style={{ textAlign: "center", fontFamily: "cursive" }}>
        Welcome to MY Bank
      </h2>
      <Dashboard />
    </div>
  );
}

export default App;
