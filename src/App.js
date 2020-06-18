import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  
  const [ repositories, setRepositories ] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository(title) {

    console.log(title)
    
    const response = await api.post('repositories', {
      title,
      url: "https://github.com/chlima88/desafio-conceitos-node",
      techs: ["NodeJS"]
    })

    const repository = response.data
    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`)

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    repositories.splice(repositoryIndex, 1)

    setRepositories([...repositories])

  }

  return (
    <div className="container">
      <div className="box"><h1>Repositories List</h1></div>
      <div className="box">
        <ul data-testid="repository-list">
          {repositories.map(repository => {
            return(
              <li key={repository.id}>
                <p>{repository.title}</p>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>)
          })}
        </ul>
      </div>
      <div className="box">
        <input id="repositoryTitle" type="text"/>
        <button onClick={() => handleAddRepository(document.getElementById("repositoryTitle").value)}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
