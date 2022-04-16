import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useWeather = () => {
  const [region, setRegion] = useState('서울');

  return { region };
};

export const WeatherContainer = createContainer(useWeather);
