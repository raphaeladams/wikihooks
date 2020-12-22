import React, { useState } from 'react';
import InputField from './components/InputField';
import SearchResults from './components/SearchResults';

import './App.css';

export default function App() {
  const [search, setSearch] = useState({});
  const [results, setResults] = useState([]);

  const handleChange = ({target}) => {
    const { name, value } = target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
      id: Date.now
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!search.title) return;
    
    let url = "https://en.wikipedia.org/w/api.php";
  
    let params = {
      action: "query",
      list: "search",
      srsearch: search.title,
      format: "json"
    };
  
    url += "?origin=*";
    Object.keys(params).forEach(key => {
      url += "&" + key + "=" + params[key];
    });
  
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(response => {
      setResults(response.query.search);
    })
    .catch(error => {
      console.log(error);
    });
    
    setSearch({});
  };

  return (
    <div className="App">
      <br></br>
      <InputField
        newSearch={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <br></br>
      <br></br>
      <SearchResults results={results} />
    </div>
  );
}
