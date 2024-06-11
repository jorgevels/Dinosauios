import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "./fonts.css";
import { Mosaic } from "react-loading-indicators";
import { FaSearch, FaPlay, FaEarlybirds } from "react-icons/fa"; // Importar ícono de nota
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function App() {
  const [dinosaur, setDinosaur] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomDinosaur = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbydyRvTTgmNfBjmTMWnS3NbeaTSmmR5eVtVTo03K36U46ukShua2sXkM_6IGByAQfI/exec`
      );
      console.log("API response:", response.data); // Depuración

      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const randomIndex = Math.floor(
          Math.random() * response.data.data.length
        );
        setDinosaur(response.data.data[randomIndex]);
        setError("");
      } else {
        setError("No dinosaur found in the API response.");
        setDinosaur(null);
      }
    } catch (error) {
      console.error("Error fetching dinosaur:", error); // Depuración
      setError("Unable to fetch a random dinosaur. Please try again.");
      setDinosaur(null);
    } finally {
      setLoading(false);
    }
  };

  const speakName = () => {
    if (dinosaur && dinosaur.name) {
      const utterance = new SpeechSynthesisUtterance(dinosaur.name);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Función para mostrar el modal
  const showNote = () => {
    MySwal.fire({
      title: <p>Nota</p>,
      text: "Para Matias de su papá",
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-container">
          <h1>Dinosaurios</h1>
          <FaEarlybirds className="note-icon" onClick={showNote} />
        </div>
        <button onClick={fetchRandomDinosaur}>
          <FaSearch style={{ marginRight: "8px" }} />
          Buscar Dinosaurio
        </button>
        {loading && (
          <div className="loading-container">
            <Mosaic color="orangered" size={"small"} />
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {dinosaur && !loading && (
          <div>
            <h2>{dinosaur.name}</h2>
            {dinosaur.image && (
              <div className="image-container">
                <img
                  src={dinosaur.image}
                  alt={dinosaur.name}
                  className="dinosaur-image"
                />
              </div>
            )}
            <p>Especie: {dinosaur.Especie}</p>
            <p>Tipo: {dinosaur.type}</p>
            <button-r onClick={speakName}>
              <FaPlay style={{ marginRight: "8px" }} />
              Reproducir Nombre
            </button-r>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
