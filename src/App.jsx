import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import PrivateOutlet from "./components/PrivateOutlet";
import EmpComponent from "./components/EmpComponent";
import ListEmpComponent from "./components/ListEmpComponent";
import ViewEmployee from "./components/ViewEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route element={<PrivateOutlet />}>
            <Route path="/emps" element={<ListEmpComponent />}></Route>
            <Route path="/add-emp" element={<EmpComponent />}></Route>
            <Route path="/update-emp/:id" element={<EmpComponent />}></Route>
            <Route path="/view-emp/:id" element={<ViewEmployee />}></Route>
          </Route>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/register" element={<RegisterComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
