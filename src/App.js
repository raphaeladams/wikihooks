import React, { useState } from 'react';
import InputField from './components/InputField';
import SearchResults from './components/SearchResults';

import './App.css';

export default function App() {
  const [search, setSearch] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = ({target}) => {
    const {name, value} = target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
      id: Date.now
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (search.title === '') { return null; }

    let urlQuery = 'https://en.wikipedia.org/w/api.php';

    let params = {
      action: 'query',
      list: 'search',
      srsearch: search.title,
      format: 'json'
    };

    urlQuery += '?origin=*';
    Object.keys(params).forEach((key) => {
      urlQuery += '&' + key + '=' + params[key];
    });

    fetch(urlQuery)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let urlBrowse = 'https://en.wikipedia.org/wiki/';
      let results = response.query.search;

      results.forEach((result) => {
        result.wikiLink = urlBrowse + result.title.replace(/\s/g, '_');
      });

      setSearchResults(results);
    })
    .catch((error) => {
      console.log(error);
    });

    setSearch({});
  };

  return (
    <div className='App'>
      <br></br>
      <InputField
        newSearch={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <br></br>
      <br></br>
      <SearchResults
        results={searchResults}
      />
    </div>
  );
}
