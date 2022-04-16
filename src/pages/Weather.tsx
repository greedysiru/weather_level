import React from 'react';

import { WeatherContainer } from '../container/weatherContainer';

const Weather = () => {
  const { region } = WeatherContainer.useContainer();
  console.log(region);
  return <>날씨</>;
};

export const WeatherPage = () => {
  return (
    <WeatherContainer.Provider>
      <Weather />
    </WeatherContainer.Provider>
  );
};
