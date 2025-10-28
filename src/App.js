import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SeriesDetailPage from "./pages/SeriesDetailPage";
import PersonDetailPage from "./pages/PersonDetailPage";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='/movies/serie' element={<SeriesPage />} />
        <Route path='/movies/movie/:ID' element={<MovieDetailPage />} />
        <Route path='/movies/tv/:ID' element={<SeriesDetailPage />} />
        <Route path='/people/:ID' element={<PersonDetailPage />} />
        <Route path='*' element={<Navigate to="/movies" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
