import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [animal, setAnimal] = useState('');
  const [location, setLocation] = useState('');
  const [breed, setBreed] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ animal, location, breed });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 justify-center mb-4 mt-8">
      <input
        type="text"
        value={animal}
        onChange={(e) => setAnimal(e.target.value)}
        placeholder="Animal"
        className="border-2 border-purple-400 rounded-md p-2"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="border-2 border-purple-400 rounded-md p-2"
      />
      <input
        type="text"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        placeholder="Breed"
        className="border-2 border-purple-400 rounded-md p-2"
      />
      <button type="submit" className="bg-purple-600 text-white rounded-md p-2 font-semibold">Search</button>
    </form>
  );
};

export default SearchForm;
