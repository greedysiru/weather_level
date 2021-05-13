import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/modules';
import { convertWeaterInfo } from 'src/shared/common';
/* import { ReactComponent as CoronaIcon } from 'public/assets/icons/i_corona.svg'; */
import styled from 'styled-components';
import { Card, Grid, Image, Title } from './elements';
import logo from '../icons/corona.png';

const Corona = (props) => {
  const [allNewCaseDes, setallNewCaseDes] = useState(null);
  const [bigRegionNewCaseDes, setBigRegionNewCaseDes] = useState(null);
  // const [allNewCaseDes, setallNewCaseDes] = useState(null)
  const { coronaCurrentBigRegionNewCaseCount, coronaAllNewCaseCount } = useSelector(
    (state: RootState) => state.weather.weatherInfo,
  );

  const logoSrc = '/icons/corona.png';

  useEffect(() => {
    setallNewCaseDes(convertWeaterInfo('corona', coronaAllNewCaseCount));
    setBigRegionNewCaseDes(convertWeaterInfo('corona', coronaCurrentBigRegionNewCaseCount));
  }, []);

  if (allNewCaseDes && setallNewCaseDes) {
    return (
      <Container>
        <Title>코로나 확진자수</Title>
        <Grid isColumn ai="center" margin="2.5rem 0">
          <Image size={18} src={logo} />
        </Grid>
        <CardWrapper>
          <Card
            width="30%"
            height="150px"
            cardTitle="전국 신규 확진자"
            cardDescription={allNewCaseDes}
            iconName="corona"
          />
          <Card
            width="30%"
            height="150px"
            cardTitle="지역 신규 확진자"
            cardDescription={bigRegionNewCaseDes}
            iconName="corona"
          />
        </CardWrapper>
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  width: ${(props) => props.theme.view.width};
  height: 90%;
  ${(props) => props.theme.flex.column};
  justify-content: flex-start;
`;

const CardWrapper = styled.div`
  width: 100%;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex.row};
  justify-content: space-around;
  padding: 1rem;
`;

export default Corona;
