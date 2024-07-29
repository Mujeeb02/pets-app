import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPetById } from '../services/api';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const data = await fetchPetById(id);
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPet();
  }, [id]);

  if (loading) return (<div role="status" className="flex justify-center items-center h-screen">
    <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>);
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;
  if (!pet) return <div className="text-center text-gray-600">No pet found</div>;
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8 items-center justify-center">
      <div className="flex flex-col items-center">
        <img src={pet.images[mainImageIndex]} alt={pet.name} className="w-full md:w-80 h-64 object-cover rounded-lg mb-4 shadow-md" />
        <div className="flex gap-2">
          {pet.images.map((img, ind) => (
            <img
              key={ind}
              src={img}
              alt={`Thumbnail ${ind}`}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer transition-transform transform hover:scale-110 ${mainImageIndex === ind ? 'ring-4 ring-yellow-500' : ''}`}
              onClick={() => setMainImageIndex(ind)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
        <h1 className="text-4xl font-bold text-gray-800">{pet.name}</h1>
        <h2 className="text-2xl font-semibold text-gray-700">{pet.animal}</h2>
        <h3 className="text-xl font-medium text-gray-600">{pet.city}</h3>
        <p className="text-lg text-gray-500">{pet.breed}</p>
        <p className="text-gray-600">{pet.description}</p>
      </div>
    </div>
  );
};

export default PetDetails;
