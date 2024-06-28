import { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';

import "../styles/Search.css"

export default function Search({ products, handleSearchReturn }) {
    // This component is for the search mechanism.
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
  
    useEffect(() => {
      if (searchTerm) {
        const results = products.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResults(Array.from(results));
      } else {
        setFilteredResults([]);
      }
    }, [searchTerm, products]);
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const toggleSearch = () => {
      setIsSearchActive(!isSearchActive);
      setSearchTerm('');
      setFilteredResults([]);
      handleSearchReturn([]);
    };
  
    return (
      <div className="search-input">
        {isSearchActive ? (
            <div className="active-search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-field"
                />
                <button onClick={toggleSearch}>
                    <AiOutlineClose className="close-icon"/>
                </button>
            </div>
        ) : (
          <button onClick={toggleSearch} className="search-button">
            <p>Search</p>
            <FaSearch className="search-icon" />
          </button>
        )}
        {isSearchActive && (
          <ul className="results-list">
            {filteredResults.map((result, index) => (
              <li key={index} onClick={() => {handleSearchReturn(result.name)}}>{result.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }