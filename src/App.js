import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data)
    })
  }, [repositories]);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Titulo ${Math.random()}`,
      url: "https://github.com/felipejoliver-fzr/BootcampDesafio1",
      techs: [
        "node",
        "reactjs",
        "react native"
      ]
    });

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    const repositorieIndex = repositories.findIndex(repo => repo.id === id);

    repositories.splice(repositorieIndex,1)

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositorie =>

          <li key={repositorie.id}>
            {repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
              </button>
          </li>

        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
