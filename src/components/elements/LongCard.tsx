import React, { Fragment } from 'react';

import styled from 'styled-components';

// elements
import { Grid, Icon } from './index';

// theme
import theme from '../../styles/theme';

type LongCardType = {
  height?: string;
  day: string;
  data: any;
  type: string;
  isFirst?: boolean;
  iconColor?: string;
  iconName?: string;
  isTime?: boolean;
};

const LongCard = (props: LongCardType) => {
  const { height, day, data, type, isFirst, iconColor, iconName, isTime } = props;
  const { color } = theme;
  const style = {
    height,
    isFirst,
  };

  const unit = {
    humidity: '%',
    rainPer: '%',
    windSpeed: 'm/s',
  };
  return (
    <ElLongCard {...style}>
      <Grid width="30%">
        <Text>{day}</Text>
      </Grid>
      {/* data 내용 */}
      {type === 'rainPer' && (
        <>
          <Icon name={type} color={color[iconColor]} isWeather />
          <Grid width="30%">
            <Text>
              {data}
              {unit[type]}
            </Text>
          </Grid>
        </>
      )}
      {/* 습도 */}
      {type === 'humidity' && (
        <>
          <Icon name={type} color={color[iconColor]} isWeather />
          <Grid width="30%">
            <Text>
              {data}
              {unit[type]}
            </Text>
          </Grid>
        </>
      )}

      {/* 바람 */}
      {type === 'windSpeed' && (
        <>
          <Icon name="wind" color={color[iconColor]} isWeather />
          <Grid width="30%">
            <Text>
              {data}
              {unit[type]}
            </Text>
          </Grid>
        </>
      )}

      {/* 날씨, 첫 슬라이드 */}
      {type === 'weather' && isTime === true && (
        <>
          <Icon name={iconName} isWeather />
          <Grid width="30%">
            <Text>
              {data}
              {unit[type]}
            </Text>
          </Grid>
        </>
      )}

      {/* 온도, 첫 슬라이드 */}
      {type === 'tmp' && isTime === true && (
        <>
          <Icon name={iconName} isWeather />
          <Grid width="30%">
            <Text>
              {data}
              {unit[type]}
            </Text>
          </Grid>
        </>
      )}

      {/* 날씨, 두번째 슬라이드 */}
      {type === 'weather' && isTime === false && (
        <>
          <Icon isWeather name={data.weather} />
          <Temp>
            <Grid isColumn>
              <TempText max="true">{data.max}</TempText>
              <TempText>{data.min}</TempText>
            </Grid>
            <Text>{data.tmp}</Text>
          </Temp>
        </>
      )}

      {/* 온도, 두번째 슬라이드 */}
      {type === 'tmp' && isTime === false && (
        <WeatherCard>
          <Icon isWeather name={data.weather} />
          <Temp>
            <Grid isColumn>
              <TempText max="true">{data.max}</TempText>
              <TempText>{data.min}</TempText>
            </Grid>
            <Text>{data.tmp}</Text>
          </Temp>
        </WeatherCard>
      )}
    </ElLongCard>
  );
};

LongCard.defaultProps = {
  height: '5%',
  isFirst: false,
  iconColor: null,
  iconName: null,
  isTime: false,
};

const ElLongCard = styled.div<LongCardType>`
  ${(props) => props.theme.flex.row};
  justify-content: space-between;
  width: 100%;
  padding: 1rem 3rem;
  height: ${(props) => (props.isFirst ? `16%` : props.height)};
  font-size: ${(props) => (props.isFirst ? '1.5rem' : '1.2rem')};
  font-weight: ${(props) => (props.isFirst ? `600` : `550`)};
  border-radius: 14px;
  ${(props) => props.theme.shadow};
  border: solid 0.5px ${(props) => props.theme.color.purple};
  background-color: white;
  margin: 5px 0;
`;

const Text = styled.div`
  width: 80px;
  text-align: center;
`;

const Temp = styled.div`
  ${(props) => props.theme.flex.row};
  width: 100px;
`;

const TempText = styled.span<{ max?: boolean }>`
  color: ${(props) => (props.max ? props.theme.color.veryBad : props.theme.color.usually)};
  margin: 1px 0;
`;

const WeatherCard = styled.div`
  width: 55%;
  ${(props) => props.theme.flex.row}
`;

export default LongCard;
