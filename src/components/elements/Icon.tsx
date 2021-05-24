import styled from 'styled-components';
import React from 'react';

// Icons Import
import { ReactComponent as Adjust } from '../../icons/adjust.svg';
import { ReactComponent as Airbad } from '../../icons/air_bad.svg';
import { ReactComponent as Airgood } from '../../icons/air_good.svg';
import { ReactComponent as Airusually } from '../../icons/air_usually.svg';
import { ReactComponent as AirveryBad } from '../../icons/air_veryBad.svg';
import { ReactComponent as Asthma } from '../../icons/asthma.svg';
import { ReactComponent as Corona } from '../../icons/corona.svg';
import { ReactComponent as Delete } from '../../icons/delete.svg';
import { ReactComponent as FoodPoison } from '../../icons/foodPoison.svg';
import { ReactComponent as Humidity } from '../../icons/humidity.svg';
import { ReactComponent as Location } from '../../icons/location.svg';
import { ReactComponent as Main } from '../../icons/main.svg';
import { ReactComponent as PollenRisk } from '../../icons/pollenRisk.svg';
import { ReactComponent as RainPerZero } from '../../icons/rainPer0.svg';
import { ReactComponent as RainPerOne } from '../../icons/rainPer1.svg';
import { ReactComponent as RainPerTwo } from '../../icons/rainPer2.svg';
import { ReactComponent as RainPerThree } from '../../icons/rainPer3.svg';
import { ReactComponent as Setting } from '../../icons/setting.svg';
import { ReactComponent as Sky } from '../../icons/sky.svg';
import { ReactComponent as Temp } from '../../icons/temp.svg';
import { ReactComponent as Uv } from '../../icons/uv.svg';
import { ReactComponent as Wind } from '../../icons/wind.svg';
import { ReactComponent as ClearDay } from '../../icons/01d.svg';
import { ReactComponent as ClearNight } from '../../icons/01n.svg';
import { ReactComponent as CloudsDay } from '../../icons/02d.svg';
import { ReactComponent as CloudsNight } from '../../icons/02n.svg';
import { ReactComponent as ScatteredCloudsDay } from '../../icons/03d.svg';
import { ReactComponent as ScatteredCloudsNight } from '../../icons/03n.svg';
import { ReactComponent as BrokenCloudsDay } from '../../icons/04d.svg';
import { ReactComponent as BrokenCloudsNight } from '../../icons/04n.svg';
import { ReactComponent as ShowerRainDay } from '../../icons/09d.svg';
import { ReactComponent as ShowerRainNight } from '../../icons/09n.svg';
import { ReactComponent as RainDay } from '../../icons/10d.svg';
import { ReactComponent as RainNight } from '../../icons/10n.svg';
import { ReactComponent as ThunderstormDay } from '../../icons/11d.svg';
import { ReactComponent as ThunderstormNight } from '../../icons/11n.svg';
import { ReactComponent as SnowDay } from '../../icons/13d.svg';
import { ReactComponent as SnowNight } from '../../icons/13n.svg';
import { ReactComponent as MistDay } from '../../icons/50d.svg';
import { ReactComponent as MistNight } from '../../icons/50n.svg';
// 옷차림 아이콘
import { ReactComponent as Muffler } from '../../icons/muffler.svg';
import { ReactComponent as Coat } from '../../icons/coat.svg';
import { ReactComponent as Filed } from '../../icons/filed.svg';
import { ReactComponent as Hoodie } from '../../icons/hoodie.svg';
import { ReactComponent as Cardigan } from '../../icons/cardigan.svg';
import { ReactComponent as Longsleeve } from '../../icons/longsleeve.svg';
import { ReactComponent as Shortsleeve } from '../../icons/shortsleeve.svg';
import { ReactComponent as Sleeveless } from '../../icons/sleeveless.svg';

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
    rainPer0: RainPerZero,
    rainPer1: RainPerOne,
    rainPer2: RainPerTwo,
    rainPer3: RainPerThree,
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
    AirveryBad,
    '01d': ClearDay,
    '01n': ClearNight,
    '02d': CloudsDay,
    '02n': CloudsNight,
    '03d': ScatteredCloudsDay,
    '03n': ScatteredCloudsNight,
    '04d': BrokenCloudsDay,
    '04n': BrokenCloudsNight,
    '09d': ShowerRainDay,
    '09n': ShowerRainNight,
    '10d': RainDay,
    '10n': RainNight,
    '11d': ThunderstormDay,
    '11n': ThunderstormNight,
    '13d': SnowDay,
    '13n': SnowNight,
    '50d': MistDay,
    '50n': MistNight,
    muffler: Muffler,
    coat: Coat,
    filed: Filed,
    hoodie: Hoodie,
    cardigan: Cardigan,
    longsleeve: Longsleeve,
    shortsleeve: Shortsleeve,
    sleeveless: Sleeveless,
  };
  // 아이콘 이름을 지정하지 않았으면 null
  if (!name) {
    return null;
  }

  // 미세먼지인 경우
  if (name === 'pm10' || name === 'pm25') {
    name = `Air${weatherState}`;
  }

  // 호출된 아이콘
  const ElIcon = IconsList[name];

  // 날씨 관련 아이콘
  if (isWeather) {
    return (
      <WeatherIconWrap {...styles}>
        <ElIcon />
      </WeatherIconWrap>
    );
  }

  // 일반 아이콘
  return (
    <IconWrap {...styles}>
      <ElIcon />
    </IconWrap>
  );
};

Icon.defaultProps = {
  name: '',
  size: 3,
  color: null,
  isWeather: false,
  weatherState: '',
};

const IconWrap = styled.div<IconType>`
  cursor: pointer;
  --size: ${(props) => props.size}rem;
  width: var(--size);
  height: var(--size);
  background-size: cover;
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
