import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PetDetailsPage from './pages/PetDetailsPage';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} ></Route>
      <Route path="/pet/:id" element={<PetDetailsPage />} />
    </Routes>
  );
};

export default App;
