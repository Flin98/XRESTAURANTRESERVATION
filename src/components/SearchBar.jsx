import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStates, getCities } from '../api/api';

const INITIAL_STATES = [
  "Texas", "California", "New York", "Florida", "Illinois", "Washington"
];

const INITIAL_CITIES = {
  "Texas": ["Austin", "Houston", "Dallas", "San Antonio"],
  "California": ["Los Angeles", "San Francisco", "San Diego"],
  "New York": ["New York", "Buffalo", "Albany"]
};

const SearchBar = ({ initialSelectedState = '', initialSelectedCity = '', onSearch }) => {
  const [states, setStates] = useState(INITIAL_STATES);
  const [cities, setCities] = useState(INITIAL_CITIES[initialSelectedState] || []);
  const [selectedState, setSelectedState] = useState(initialSelectedState);
  const [selectedCity, setSelectedCity] = useState(initialSelectedCity);
  
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getStates()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStates(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      if (INITIAL_CITIES[selectedState]) {
        setCities(INITIAL_CITIES[selectedState]);
      }
      getCities(selectedState)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setCities(data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedState || !selectedCity) return;
    if (onSearch) {
      onSearch(selectedState, selectedCity);
    } else {
      navigate(`/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`);
    }
  };

  return (
    <form className="search-form-card" onSubmit={handleSubmit}>
      <div className="search-inputs-wrapper">
        
        {/* div#state clicked by Cypress */}
        <div 
          id="state" 
          className="custom-dropdown" 
          onClick={() => setStateOpen(!stateOpen)}
        >
          <div className="selected-value">
            {selectedState || "Select State"}
          </div>
          {stateOpen && (
            <ul className="dropdown-menu">
              {states.map((st) => (
                <li
                  key={st}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedState(st);
                    setSelectedCity('');
                    setStateOpen(false);
                  }}
                >
                  {st}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* div#city clicked by Cypress */}
        <div 
          id="city" 
          className="custom-dropdown" 
          onClick={() => {
            if (selectedState) {
              setCityOpen(!cityOpen);
            }
          }}
        >
          <div className="selected-value">
            {selectedCity || "Select City"}
          </div>
          {cityOpen && (
            <ul className="dropdown-menu">
              {cities.map((ct) => (
                <li
                  key={ct}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCity(ct);
                    setCityOpen(false);
                  }}
                >
                  {ct}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search button with id="searchBtn" and type="submit" */}
        <button type="submit" id="searchBtn" className="btn-primary search-btn">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;