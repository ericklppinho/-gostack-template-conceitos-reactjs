import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(r => setRepositories(r.data));
  }, []);

  async function handleAddRepository() {
    const repository = (await api.post('repositories', {
      title: 'Desafio ReactJS',
      url: '',
      techs: ['React']
    })).data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const status = (await api.delete('repositories/'+id)).status;
    if(status === 204) {
      setRepositories(repositories.filter(r => r.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
