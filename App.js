// App.js
import React, { useState } from 'react';
import axios from 'axios';
import CryptoList from './CryptoList';

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
       <div id="search">
	<svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
		<rect class="bar"/>
		
		<g class="magnifier">
			<circle class="glass"/>
			<line class="handle" x1="32" y1="32" x2="44" y2="44"></line>
		</g>

		<g class="sparks">
			<circle class="spark"/>
			<circle class="spark"/>
			<circle class="spark"/>
		</g>

		<g class="burst pattern-one">
			<circle class="particle circle"/>
			<path class="particle triangle"/>
			<circle class="particle circle"/>
			<path class="particle plus"/>
			<rect class="particle rect"/>
			<path class="particle triangle"/>
		</g>
		<g class="burst pattern-two">
			<path class="particle plus"/>
			<circle class="particle circle"/>
			<path class="particle triangle"/>
			<rect class="particle rect"/>
			<circle class="particle circle"/>
			<path class="particle plus"/>
		</g>
		<g class="burst pattern-three">
			<circle class="particle circle"/>
			<rect class="particle rect"/>
			<path class="particle plus"/>
			<path class="particle triangle"/>
			<rect class="particle rect"/>
			<path class="particle plus"/>
		</g>
	</svg>
	<input 
  type="search"
  value={search}
  onChange={handleSearchChange}
  
  placeholder="Enter Crypto Symbol (e.g., BTC)" name="q" aria-label="Search for inspiration"/>
</div>

<div id="results">
	
</div>

      <button onClick={handleSearch}>Search</button>
      {crypto && (
        <div>
          <h3>{crypto.name}</h3>
          <p>Low 24h: ${crypto.low_24h}</p>
          <p>High 24h: ${crypto.high_24h}</p>
          <p>Current Price: ${crypto.current_price}</p>
        </div>
      )}
      <div className="App">
      <CryptoList />
    </div>
    

    </div>
    
  );
  
}


export default App;
