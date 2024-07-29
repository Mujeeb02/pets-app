import React from 'react';
import PetDetails from '../components/PetDetails';

const PetDetailsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <PetDetails />
      </div>
    </div>
  );
};

export default PetDetailsPage;
