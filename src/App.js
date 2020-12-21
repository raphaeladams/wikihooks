import React, { useState } from 'react';
import InputField from './components/InputField';
import SearchResults from './components/SearchResults';

import './App.css';

export default function App() {
  const [newSearch, setNewSearch] = useState({});
  const [results, setResults] = useState([]);

  const handleChange = ({target}) => {
    const { name, value } = target;
    setNewSearch((prev) => ({ ...prev, [name]: value, id: Date.now }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newSearch.title) return;
    
    var url = "https://en.wikipedia.org/w/api.php";
  
    var params = {
      action: "query",
      list: "search",
      srsearch: newSearch.title,
      format: "json"
    };
  
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
  
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      setResults(response.query.search);
    })
    .catch(function(error) {
      console.log(error);
    });
    
    setNewSearch({});
  };

  return (
    <div className="App">
      <br></br>
      <InputField
        newSearch={newSearch}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <br></br>
      <br></br>
      <SearchResults results={results} />
    </div>
  );
}
