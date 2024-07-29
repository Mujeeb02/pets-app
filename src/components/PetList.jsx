import React, { useEffect, useState } from 'react';
import { fetchPets, searchPets } from '../services/api';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PetList = ({ searchParams }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('');
  const [animalType, setAnimalType] = useState('');

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        let data;
        if (searchParams && Object.keys(searchParams).length > 0) {
          data = await searchPets({ ...searchParams, animalType, page });
        } else {
          data = await fetchPets(page, animalType);
        }
        setPets(data.pets);
        setTotalPages((data.numberOfResults/(data.endIndex-data.startIndex+1))); // Example static total pages, should be dynamic based on API response
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, [searchParams, page, animalType]);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleAnimalTypeChange = (e) => {
    setAnimalType(e.target.value);
  };

  const sortedPets = () => {
    if (!sortCriteria) return pets;
    return [...pets].sort((a, b) => {
      if (a[sortCriteria] < b[sortCriteria]) return -1;
      if (a[sortCriteria] > b[sortCriteria]) return 1;
      return 0;
    });
  };

  if (loading) {
    return (
      <div role="status" className="flex justify-center items-center h-screen">
        <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between px-24 mb-4">
        <select value={sortCriteria} onChange={handleSortChange} className="p-2 rounded border border-gray-300">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="city">City</option>
        </select>
        <select value={animalType} onChange={handleAnimalTypeChange} className="p-2 rounded border border-gray-300">
          <option value="">All Animals</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-24">
        {sortedPets && sortedPets().map(pet => (
          <Link to={`/pet/${pet.id}`} key={pet.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{pet.name}</h2>
            <p className="text-gray-600 mb-4">{pet.description.slice(0, 100)}</p>
            <img src={pet.images[0]} alt={pet.name} className="w-full h-40 object-cover rounded-md" />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {totalPages > 0 && (
          Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-4 py-2 mx-1 rounded ${page === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))
        )}
      </div>
    </>
  );
};

export default PetList;
