import styled from 'styled-components';
import React from 'react';

// Icons Import
import { ReactComponent as Adjust } from '../../icons/adjust.svg';
import { ReactComponent as Airbad } from '../../icons/air_bad.svg';
import { ReactComponent as Airgood } from '../../icons/air_good.svg';
import { ReactComponent as Airusually } from '../../icons/air_usually.svg';
import { ReactComponent as Airverybad } from '../../icons/air_veryBad.svg';
import { ReactComponent as Asthma } from '../../icons/asthma.svg';
import { ReactComponent as Corona } from '../../icons/corona.svg';
import { ReactComponent as Delete } from '../../icons/delete.svg';
import { ReactComponent as FoodPoison } from '../../icons/foodPoison.svg';
import { ReactComponent as Humidity } from '../../icons/humidity.svg';
import { ReactComponent as Location } from '../../icons/location.svg';
import { ReactComponent as Main } from '../../icons/main.svg';
import { ReactComponent as PollenRisk } from '../../icons/pollenRisk.svg';
import { ReactComponent as RainPer } from '../../icons/rainPer.svg';
import { ReactComponent as Setting } from '../../icons/setting.svg';
import { ReactComponent as Sky } from '../../icons/sky.svg';
import { ReactComponent as Temp } from '../../icons/temp.svg';
import { ReactComponent as Uv } from '../../icons/uv.svg';
import { ReactComponent as Wind } from '../../icons/wind.svg';

type IconType = {
  name?: string;
  size?: number;
  color?: string;
  isWeather?: boolean;
  weatherState?: string;
};

const Icon = (props: IconType) => {
  const { size, isWeather, color, weatherState } = props;
  let { name } = props;
  const styles = { name, size, color };
  // 불러올 수 있는 아이콘 리스트
  const IconsList = {
    temp: Temp,
    rainPer: RainPer,
    weather: Sky,
    corona: Corona,
    humidity: Humidity,
    wind: Wind,
    uv: Uv,
    asthma: Asthma,
    foodPoison: FoodPoison,
    pollenRisk: PollenRisk,
    adjust: Adjust,
    delete: Delete,
    location: Location,
    main: Main,
    setting: Setting,
    Airgood,
    Airusually,
    Airbad,
    Airverybad,
  };

  // 미세먼지인 경우
  if (name === 'pm10' || name === 'pm25') {
    console.log(name, color);
    name = `Air${weatherState}`;
  }

  // 호출된 아이콘
  const ElIcon = IconsList[name];

  // 아이콘 이름을 지정하지 않았으면 null
  if (!name) {
    return null
  }

  if (isWeather) {
    return (
      <WeatherIconWrap {...styles}>
        <ElIcon />
      </WeatherIconWrap>
    );
  }
  return (
    <IconWrap {...styles}>
      <ElIcon />
    </IconWrap>
  );
};

Icon.defaultProps = {
  name: '',
  size: 3,
  color: 'black',
  isWeather: false,
  weatherState: '',
};

const IconWrap = styled.div<IconType>`
  --size: ${(props) => props.size}rem;
  width: var(--size);
  height: var(--size);
  background-size: cover;
  &:hover svg {
    fill: black;
  }
  & svg {
    fill: ${(props) => props.theme.color.gray3};
    transition: 0.3s;
  }
`;

const WeatherIconWrap = styled.div<IconType>`
  --size: ${(props) => props.size}rem;
  width: var(--size);
  height: var(--size);
  background-size: cover;
  & svg {
    fill: ${(props) => props.color};
  }
`;

export default Icon;
