import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

function App() {
  const [movie, setMovie] = React.useState({
    Title: "",
    Year: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Plot: "",
    Language: "",
    Country: "",
    Poster: ""
  })

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3001/search?title=${searchValue}`);
    const data = await response.json();
    setMovie(data);

    console.log(data);

    setSearchValue('');
  }

  return (
    <div className="App">
      <div className="container">
        <div className="form">
          <h1>Search a movie</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-element">
              <label htmlFor="query">Movie</label>
              <input className="form-query"type="text" name="query" placeholder="Ex: Forrest Gump" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} required />
              <small className="query-help">Type a movie name and we will bring information about it</small>
            </div>
            <input className="form-submit" type="submit" value="Submit" />
          </form>
        </div>
        {movie.Title === "" ? null :
          <div className="result">
            <div className="result-element">
              <img src={movie.Poster} alt={movie.Title} width='300px' />
              <div className="result-element-info">
                <h2>{movie.Title}</h2>
                <p>{movie.Released}</p>
                <p>{movie.Runtime}</p>
                <p>{movie.Genre}</p>
                <p>{movie.Director}</p>
                <p>{movie.Language}</p>
                <p>{movie.Country}</p>
              </div>
            </div>
            <div className="result-element-desc">
              <p>{movie.Plot}</p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default App;
