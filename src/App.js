import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "./fonts.css";

function App() {
  const [dinosaur, setDinosaur] = useState(null);
  const [error, setError] = useState("");

  const fetchRandomDinosaur = async () => {
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbydyRvTTgmNfBjmTMWnS3NbeaTSmmR5eVtVTo03K36U46ukShua2sXkM_6IGByAQfI/exec`
      );
      console.log("API response:", response.data); // Depuración

      // Verificar si la respuesta contiene datos de dinosaurio
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
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dinosaurios</h1>
        <button onClick={fetchRandomDinosaur}>Buscar Dinosarios</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {dinosaur && (
          <div>
            <h2>{dinosaur.name}</h2>
            {dinosaur.image && (
              <img
                src={dinosaur.image}
                alt={dinosaur.name}
                style={{ maxWidth: "100%" }}
              />
            )}
            <p>Especie: {dinosaur.Especie}</p>
            <p>Tipo: {dinosaur.type}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
