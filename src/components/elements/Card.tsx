import React from 'react';

import styled, { withTheme } from 'styled-components';

import { history } from '../../redux/configureStore';

// elements
import { Grid, Text, Icon } from './index';

// Theme
import theme from '../../styles/theme';

type cardType = {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  bg?: string;
};

type CardInfoType = {
  cardTitle: string;
  cardDescription: [string, number | string, string];
  iconName?: string;
};

// 날씨 정보를 표시하는 카드
const Card = (props: cardType & CardInfoType) => {
  const { width, height, margin, padding, bg } = props;
  // 카드 정보
  const { cardTitle, cardDescription, iconName } = props;
  // 테마 컬러
  const { color } = theme;
  let weatherState = '';
  let value: string | number = '';
  let historyPath = '';
  // 카드 설명이 있을 경우 정보 가져오기
  if (cardDescription != null) {
    weatherState = cardDescription[0];
    value = cardDescription[1];
    historyPath = cardDescription[2];
  }
  const style = {
    width,
    height,
    margin,
    padding,
    bg,
  };

  const movePage = () => {
    if (historyPath) {
      history.push(`/detail/${historyPath}`);
    }
  };
  return (
    <>
      <ElCard {...style} onClick={movePage}>
        <Grid isColumn height="70%" ai="center" jc="space-between">
          <Grid>
            <Text bold="700" size="1.4rem">
              {cardTitle}
            </Text>
          </Grid>
          <Grid>
            <Icon name={iconName} color={color[weatherState]} weatherState={weatherState} isWeather />
          </Grid>
          <Grid ai="flex-end">
            <Text bold="700" size="1.4rem" color={color[weatherState]}>
              {value}
            </Text>
          </Grid>
        </Grid>
      </ElCard>
    </>
  );
};

Card.defaultProps = {
  width: '',
  height: '100%',
  margin: '0px',
  padding: '0px',
  bg: 'white',
  iconName: '',
};

const ElCard = styled.div<cardType>`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  border-radius: 2rem;
  ${(props) => props.theme.shadow};
  border: solid 0.5px ${(props) => props.theme.color.purple};
`;
export default Card;
