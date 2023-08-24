import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./Componenti/Header";
import Footer from "./Componenti/Footer";
import Home from "./Componenti/Home";
import TopFilm from "./Componenti/topFilm";

function App() {
  return (
    <Router>
    <div className=" mx-5">
      <Header />
      <TopFilm />
      <Routes>

        <Route path='/movies' exact element={<Home />}></Route>
        {/* <Route path='/movies/Storia' element={<Storia />}></Route> */}
        {/* <Route path='/movies/Shop' element={<Shop />}></Route> */}

      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
