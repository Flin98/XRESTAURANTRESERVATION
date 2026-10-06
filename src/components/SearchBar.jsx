import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStates, getCities } from '../api/api';

const SearchBar = ({ initialSelectedState = '', initialSelectedCity = '', onSearch }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(initialSelectedState);
  const [selectedCity, setSelectedCity] = useState(initialSelectedCity);
  
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getStates()
      .then((data) => setStates(data || []))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);
      getCities(selectedState)
        .then((data) => {
          setCities(data || []);
          setLoadingCities(false);
        })
        .catch((err) => {
          console.error("Error fetching cities:", err);
          setCities([]);
          setLoadingCities(false);
        });
    } else {
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedState]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setIsStateOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

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
        
        {/* Exact requirement: div#state containing clickable <li> items */}
        <div 
          id="state" 
          ref={stateRef} 
          className="custom-dropdown" 
          onClick={() => setIsStateOpen(!isStateOpen)}
        >
          <div className="selected-value">
            {selectedState || "Select State"}
          </div>
          {isStateOpen && (
            <ul className="dropdown-menu">
              {states.map((st) => (
                <li
                  key={st}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedState(st);
                    setSelectedCity('');
                    setIsStateOpen(false);
                  }}
                >
                  {st}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Exact requirement: div#city containing clickable <li> items */}
        <div 
          id="city" 
          ref={cityRef} 
          className={`custom-dropdown ${(!selectedState || loadingCities) ? 'disabled' : ''}`}
          onClick={() => {
            if (selectedState && !loadingCities) {
              setIsCityOpen(!isCityOpen);
            }
          }}
        >
          <div className="selected-value">
            {loadingCities ? "Loading cities..." : (selectedCity || "Select City")}
          </div>
          {isCityOpen && (
            <ul className="dropdown-menu">
              {cities.map((ct) => (
                <li
                  key={ct}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCity(ct);
                    setIsCityOpen(false);
                  }}
                >
                  {ct}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Exact requirement: button type="submit" id="searchBtn" labeled Search */}
        <button type="submit" id="searchBtn" className="btn-primary search-btn">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;