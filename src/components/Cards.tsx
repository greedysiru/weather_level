import React from 'react';

// Elemtes
import { Card, Grid } from './elements';

type cardsType = {
  isFirst?: boolean;
  cardsInfo: any;
};
// 카드목록 컴포넌트
const Cards = (props: cardsType) => {
  const { isFirst, cardsInfo } = props;
  const { first, second } = cardsInfo;

  // 첫 슬라이드의 카드 목록이면 4열로 보여주기
  if (isFirst) {
    return (
      <>
        {first.map((info, idx) => {
          return <Card key={idx} width="22.5%" cardTitle={info.label} cardDescription={info.description} iconName={info.type} />;
        })}
      </>
    );
  }

  // 두번째 슬라이드 3열 카드 보여주기
  return (
    <Grid height="100%">
      <Grid $wrap height="200%" jc="space-between">
        {second.map((info, idx) => {
          return (
            <Card key={idx} margin="0 0 1rem 0" width="31%" height="23%" cardTitle={info.label} cardDescription={info.description} iconName={info.type} />
          );
        })}
        {/* 공백 */}
        <Grid width="100%" height="6%" />
      </Grid>
    </Grid>
  );
};

Cards.defaultProps = {
  isFirst: false,
};

export default Cards;
