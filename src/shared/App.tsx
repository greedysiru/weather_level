import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherPage } from '../pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
