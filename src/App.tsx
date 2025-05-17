import { useEffect, useState } from "react";

import "./App.css";
import CalenderList from "./pages/Calender";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import LayoutWithHeader from "./components/LayoutWithHeader";

function App() {
  return (
    <>
      <section id="app">
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignIn />} />
            <Route element={<LayoutWithHeader />}>
              <Route path="/calender" element={<CalenderList />} />
            </Route>{" "}
          </Routes>
        </Router>
      </section>
    </>
  );
}

export default App;
