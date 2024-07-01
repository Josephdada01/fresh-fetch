import { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';

import "../styles/Search.css"

export default function Search({ products, handleSearchReturn }) {
    // This component is for the search mechanism.

    // Keeps track of weather the search button is pressed and displays a search input if it is
    const [isSearchActive, setIsSearchActive] = useState(false);
    // Keeps track of changes in the search input field.
    const [searchTerm, setSearchTerm] = useState('');
    // Keeps track of all the product names that match the search term
    const [filteredResults, setFilteredResults] = useState([]);
  
    // This changes everytime the search term or the products array change
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
      {/* If search button is pressed display the input and the cancel button */}
        {isSearchActive ? (
            <div className="active-search-container">
                <input
                    aria-label="Search for products"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-field"
                />
                <button onClick={toggleSearch} aria-label="close-btn">
                    <AiOutlineClose className="close-icon"/>
                </button>
            </div>
        // If not, display the search button
        ) : (
          <button onClick={toggleSearch} className="search-button">
            <p>Search</p>
            <FaSearch className="search-icon" />
          </button>
        )}

        {/* Display all the matches of the search */}
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