import React from "react";
import ReactHtmlParser from "react-html-parser";

import './SearchResults.css';

export default function SearchResults({results}) {
  return (
    <div>
      {results.map(result => (
        <div className="result" key={result.pageid}>
          <h2>{result.title}</h2>
          
          <a href={result.wikiLink}
            target="_blank"
            rel="noreferrer">
            wikipedia
          </a>
          
          <p>{ReactHtmlParser(result.snippet)}...</p>
        </div>
      ))}
    </div>
  );
}
