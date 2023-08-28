import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./Componenti/Header";
import Footer from "./Componenti/Footer";
import Films from "./Componenti/cercaFilms";

import Serie from "./Componenti/Serie";
import DescrzioneAperto from "./Componenti/DescrzioneAperto";

function App() {
  return (
    <Router>
    <div className=" mx-5">
      <Header />

      <Routes>

        <Route path='/movies' exact element={<Films />}></Route>
        <Route path='/movies/serie' element={<Serie />}></Route> 
        <Route path='/movies/ID' element={<DescrzioneAperto />}></Route>

      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
