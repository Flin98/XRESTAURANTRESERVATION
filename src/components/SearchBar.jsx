import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStates, getCities } from '../api/api';

const SearchBar = ({ initialSelectedState = '', initialSelectedCity = '', onSearch }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(initialSelectedState);
  const [selectedCity, setSelectedCity] = useState(initialSelectedCity);
  const [loadingCities, setLoadingCities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getStates()
      .then((data) => setStates(data))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);
      getCities(selectedState)
        .then((data) => {
          setCities(data);
          setLoadingCities(false);
        })
        .catch((err) => {
          console.error("Error fetching cities:", err);
          setLoadingCities(false);
        });
    } else {
      setCities([]);
      setSelectedCity('');
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
        {/* Exact requirement: div id="state" */}
        <div id="state" className="dropdown-container">
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity('');
            }}
            required
          >
            <option value="">Select State</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Exact requirement: div id="city" */}
        <div id="city" className="dropdown-container">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState || loadingCities}
            required
          >
            <option value="">
              {loadingCities ? 'Loading cities...' : 'Select City'}
            </option>
            {cities.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>

        {/* Exact requirement: type="submit", id="searchBtn", Text "Search" */}
        <button type="submit" id="searchBtn" className="btn-primary search-btn">
          🔍 Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;