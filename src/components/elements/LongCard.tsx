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
  bottomLine?: boolean;
};

const LongCard = (props: LongCardType) => {
  const { height, day, data, type, isFirst, iconColor, iconName, isTime, bottomLine } = props;
  const { color } = theme;
  const style = {
    height,
    isFirst,
    bottomLine,
  };

  const unit = {
    humidity: '%',
    rainPer: '%',
    windSpeed: 'm/s',
  };
  return (
    <ElLongCard {...style}>
      <Grid width="20%">
        <Text>{day}</Text>
      </Grid>
      {/* data 내용 */}
      {/*  강수 확률 */}
      {type === 'rainPer' && (
        <>
          <Icon name={iconName} color={color[iconColor]} isWeather />
          <Grid width="20%">
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
          <Icon name={iconName} color={color[iconColor]} isWeather />
          <Grid width="20%">
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
          <Grid width="20%">
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
          <Grid width="20%">
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
          <Grid width="20%">
            <Text>
              {data}
              {unit[type]}
            </Text>
          </Grid>
        </>
      )}

      {/* 날씨, 두번째 슬라이드 */}
      {type === 'weather' && isTime === false && (
        <WeatherCard>
          <Grid width="30%">
            <Icon isWeather name={data.weather} />
          </Grid>
          <Temp>
            <Grid>
              <Text>{data.tmp}</Text>
            </Grid>
            <Grid isColumn ai="center">
              <TempText max="true">{data.max}</TempText>
              <TempText>{data.min}</TempText>
            </Grid>
          </Temp>
        </WeatherCard>
      )}

      {/* 기온, 두번째 슬라이드 */}
      {type === 'tmp' && isTime === false && (
        <WeatherCard>
          <Grid width="30%">
            {isFirst ? (
              <Icon isWeather size={5} name={data.weather} />) :
              (<Icon isWeather size={3.5} name={data.weather} />)}
          </Grid>
          <Temp>
            <Grid>
              <Text>{data.tmp}</Text>
            </Grid>
            <Grid isColumn ai="center">
              <TempText max="true">{data.max}</TempText>
              <TempText>{data.min}</TempText>
            </Grid>
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
  bottomLine: false,
};

const ElLongCard = styled.div<LongCardType>`
  ${(props) => props.theme.flex.row};
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  height: ${(props) => (props.isFirst ? `16%` : props.height)};
  font-size: ${(props) => (props.isFirst ? '1.6rem' : '1.2rem')};
  font-weight: ${(props) => (props.isFirst ? `600` : `550`)};
  
  border-radius: ${(props) => props.bottomLine ? (null) : ('14px')};
  ${(props) => props.bottomLine ? (null) : (props.theme.shadow)};
  ${(props) => props.bottomLine ? (
    `border-bottom: solid 1px ${props.theme.color.purple}`
  ) :
    (
      `border: solid 0.5px ${props.theme.color.purple}`
    )};
  background-color: white;
  margin: 0 0 0.5rem 0;
`;

const Text = styled.div`
  width: 80px;
  text-align: center;
`;

const Temp = styled.div`
  ${(props) => props.theme.flex.row};
  width: 70%;
`;

const TempText = styled.span<{ max?: boolean }>`
  color: ${(props) => (props.max ? props.theme.color.veryBad : props.theme.color.usually)};
  margin: 3px 0;
`;

const WeatherCard = styled.div`
  width: 80%;
  ${(props) => props.theme.flex.row}
`;

export default LongCard;
