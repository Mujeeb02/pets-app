import React, { useState } from 'react';
import PetList from '../components/PetList';
import SearchForm from '../components/SearchForm';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [searchParams, setSearchParams] = useState({});
  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold text-gray-800 mb-4">Pet Listing</Link>
          <SearchForm onSearch={handleSearch} />
        </div>
        <PetList searchParams={searchParams} />
      </div>
    </div>
  );
};

export default HomePage;
