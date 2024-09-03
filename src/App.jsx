import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Login, Register, Buy, Rent, Agents, About } from "./pages";

export class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="*" element={<h1>Element Not Found</h1>}></Route>
            <Route path="" element={<Home />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="buy" element={<Buy />}></Route>
            <Route path="rent" element={<Rent />}></Route>
            <Route path="agents" element={<Agents />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
