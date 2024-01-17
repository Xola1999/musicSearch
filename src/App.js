import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    // Check if the search term is empty
    if (!searchTerm.trim()) {
      setErrorMessage('Please enter a search term.');
      return;
    }

    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${searchTerm}`
      );
      setResults(response.data.results);
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('An error occurred while fetching results.');
    }
  };

  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  const removeFromFavorites = (item) => {
    const updatedFavorites = favorites.filter((fav) => fav.trackId !== item.trackId);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="container">
      <div className="search-container">
        <h1>iTunes Search App</h1>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
      <div className="results-container">
        <h2>Results</h2>
        <ul>
          {results.map((item) => (
            <li key={item.trackId}>
              {item.trackName}{' '}
              <button onClick={() => addToFavorites(item)}>Add to Favorites</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="favorites-container">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((item) => (
            <li key={item.trackId}>
              {item.trackName}{' '}
              <button onClick={() => removeFromFavorites(item)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
