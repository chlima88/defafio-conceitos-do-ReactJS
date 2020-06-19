import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [title, setTitle] = useState('');
  const [techs, setTechs] = useState([]);
  const [url, setUrl] = useState('');
  const [ repositories, setRepositories ] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository(e) {
    e.preventDefault();
    
    const response = await api.post('repositories', {
      title,
      url,
      techs: techs || ["NodeJS"]
    })

    const repository = response.data
    setRepositories([...repositories, repository])
    handleResetInput()

  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`)

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    repositories.splice(repositoryIndex, 1)

    setRepositories([...repositories])
  }

  
  function handleResetInput(){
    setTechs('')
    setTitle('')
    setUrl('')
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
                  Remove
                </button>
              </li>)
          })}
        </ul>
      </div>
      <div className="box">
        <form onSubmit={handleAddRepository}>
          <div className="inputgroup">
            <input 
              placeholder='Repository Title'
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <input 
              placeholder='Techs'
              type="text"
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>
          
          <div className="inputgroup">
          <input 
            placeholder='URL'
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
