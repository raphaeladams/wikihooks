import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";

import './SearchResults.css';

export default function SearchResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        list: "search",
        srsearch: "Helicopter",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          if (response.query.search[0].title === "Helicopter"){
            // console.log("Your search page 'Helicopter' exists on English Wikipedia" );
            setResults(response.query.search);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }, []);

  return (
    <div>
      {results.map(result => (
        <div className="result" key={result.pageid}>
          <h2>{result.title}</h2>
          <p>{ReactHtmlParser(result.snippet)}...</p>
        </div>
      ))}
    </div>
  );
}
