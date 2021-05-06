import React from 'react';

import styled, { withTheme } from 'styled-components';

// elements
import { Grid, Text } from './index';

type cardType = {
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
const Card = (props: cardType & CardInfoType) => {
  const { width, height, margin, padding, bg } = props;
  // 카드 정보
  const { cardTitle, cardText } = props;
  const style = {
    width, height, margin, padding, bg
  }
  return (
    <>
      <ElCard
        {...style}
      >
        <Grid
          isColumn
          height="70%"
          ai="center"
          jc="space-between"
        >
          <Grid>
            <Text
              bold="700"
              size="1.4rem"
            >
              {cardTitle}
            </Text>
          </Grid>
          <Grid>
            그림
        </Grid>
          <Grid
            ai="flex-end"
          >
            <Text
              bold="700"
              size="1.4rem"
            >
              {cardText}
            </Text>
          </Grid>
        </Grid>
      </ElCard>
    </>
  )
}

Card.defaultProps = {
  width: '',
  height: '100%',
  margin: '0px',
  padding: '0px',
  bg: 'white',
}

const ElCard = styled.div<cardType>`
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
