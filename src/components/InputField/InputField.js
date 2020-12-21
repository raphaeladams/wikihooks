import React from "react";

export default function InputField({ newSearch, handleChange, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Search here!"
        value={newSearch.title || ""}
        onChange={handleChange}
      />
      <button type="submit">
        SEARCH
      </button>
    </form>
  );
}
