import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/components/search.css";

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search (brand or model)"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
