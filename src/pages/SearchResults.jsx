import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRestaurants } from '../api/api';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const stateParam = searchParams.get('state') || '';
  const cityParam = searchParams.get('city') || '';

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = (st, ct) => {
    if (!st || !ct) return;
    setLoading(true);
    getRestaurants(st, ct)
      .then((data) => {
        setRestaurants(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
        setRestaurants([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (stateParam && cityParam) {
      fetchResults(stateParam, cityParam);
    }
  }, [stateParam, cityParam]);

  const handleSearch = (st, ct) => {
    setSearchParams({ state: st, city: ct });
    fetchResults(st, ct);
  };

  return (
    <div className="search-results-page">
      <div className="search-header-strip">
        <SearchBar
          initialSelectedState={stateParam}
          initialSelectedCity={cityParam}
          onSearch={handleSearch}
        />
      </div>

      <div className="results-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching restaurants from backend (this may take up to 60s)...</p>
          </div>
        ) : (
          <>
            {/* Exact requirement: <h1> tag with format: {number} restaurants available in {city} */}
            <h1 className="results-count-heading">
              {restaurants.length} restaurants available in {cityParam || 'selected area'}
            </h1>
            <p className="verified-text">✔ Book tables with minimum wait-time & verified restaurant details</p>

            <div className="results-layout">
              <div className="cards-column">
                {restaurants.length > 0 ? (
                  restaurants.map((rest, idx) => (
                    <RestaurantCard key={idx} restaurant={rest} />
                  ))
                ) : (
                  <p>No restaurants found. Please try another city or state.</p>
                )}
              </div>

              <div className="sidebar-promo">
                <div className="promo-poster">
                  <h3>SUPER DELICIOUS FOOD</h3>
                  <h1>50% OFF</h1>
                  <p>Order Now and Reserve your Table Today</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;