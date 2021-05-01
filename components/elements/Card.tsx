import React from 'react';

import styled, { withTheme } from 'styled-components';

// elements
import { Grid, Text } from './index';

type CardType = {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  bg?: string;
}

type CardInfoType = {
  cardTitle: string;
  cardText: string | number;
}

// 날씨 정보를 표시하는 카드
const Card = (props: CardType & CardInfoType) => {
  const { width, height, margin, padding, bg } = props;
  // 카드 정보
  const { cardTitle, cardText } = props;
  const style = {
    width, height, margin, padding, bg
  }
  return (
    <React.Fragment>
      <ElCard
        {...style}
      >
        <Grid
          is_column
          height="85%"
          ai="center"
          jc="space-between"
        >
          <Grid>
            <Text bold>
              {cardTitle}
            </Text>
          </Grid>
          <Grid>
            그림
        </Grid>
          <Grid
            ai="flex-end"
          >
            <Text bold>
              {cardText}
            </Text>
          </Grid>
        </Grid>
      </ElCard>
    </React.Fragment>
  )
}

Card.defaultProps = {
  width: '',
  height: '100%',
  margin: '0px',
  paddig: '0px',
  bg: 'whitesmoke',
}

const ElCard = styled.div<CardType>`
display:flex;
align-items: center;
width: ${(props) => props.width};
height: ${(props) => props.height};
margin: ${(props) => props.margin};
padding: ${(props) => props.padding};
background-color: ${(props) => props.bg};
border-radius: 20px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`
export default Card;
