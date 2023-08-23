import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./Componenti/Header";
import Footer from "./Componenti/Footer";
import Home from "./Componenti/Home";

function App() {
  return (
    <Router>
    <div className=' max-w-5xl bg-slate-500 w-full h-auto mx-auto'>
      <h1 className=" text-red-500">ciao</h1>
      <Header />

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
