  import "./App.css";
  import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
  import CrearUser from "./Pages/CrearUser";
  import Home from "./Pages/Home";
  import React from "react";

  function App() {
    
    return (
    <div className="App" class="container">
      <Router>
        <Routes>
          <Route path="/createuser" element={<CrearUser/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
   
    
    );
  }

  export default App;
