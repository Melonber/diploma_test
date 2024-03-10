// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [crypto, setCrypto] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      alert("Please enter a cryptocurrency symbol to search.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/cryptos?symbol=${search.toLowerCase()}`);
      setCrypto(response.data);
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error);
      alert("Cryptocurrency not found.");
      setCrypto(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Enter Crypto Symbol (e.g., BTC)"
      />
      <button onClick={handleSearch}>Search</button>
      {crypto && (
        <div>
          <h3>{crypto.name}</h3>
          <p>Low 24h: ${crypto.low_24h}</p>
          <p>High 24h: ${crypto.high_24h}</p>
          <p>Current Price: ${crypto.current_price}</p>
        </div>
      )}
    </div>
  );
}

export default App;
