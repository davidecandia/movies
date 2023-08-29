import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Header from "./Componenti/Header";
import Footer from "./Componenti/Footer";
import Films from "./Componenti/cercaFilms";
import Serie from "./Componenti/Serie";
import DescrzioneAperto from "./Componenti/DescrzioneAperto";
import DescrzioneApertoTV from "./Componenti/DescrizioneApertoTV";

function App() {
  return (
    <Router>
      <div className="mt-4">
        <Header />

        <Routes>
          <Route path='/movies' element={<Films />} />
          <Route path='/movies/serie' element={<Serie />} />
          <Route path='/movies/:type/:ID' element={<DetailPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

const DetailPage = () => {
  const { type, ID } = useParams();

  // Decide quale componente renderizzare in base al tipo
  if (type === "movie") {
    return <DescrzioneAperto movieID={ID} />;
  } else if (type === "tv") {
    return <DescrzioneApertoTV movieID={ID} />;
  } else {
    return <p>Errore: Tipo di contenuto non valido</p>;
  }
}

export default App;
