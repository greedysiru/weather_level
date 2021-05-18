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
  const { corona } = useSelector(
    (state: RootState) => state.weather.weatherInfo,
  );

  const logoSrc = '/icons/corona.png';

  useEffect(() => {
    setallNewCaseDes(convertWeaterInfo('corona', corona.allNewCaseCount));
    setBigRegionNewCaseDes(convertWeaterInfo('corona', corona.currentBigRegionNewCaseCount));
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
            width="35vw"
            margin="0 1.5rem"
            height="100%"
            cardTitle="전국 확진자"
            cardDescription={allNewCaseDes}
            iconName="corona"
          />
          <Card
            width="35vw"
            height="100%"
            cardTitle="지역 확진자"
            cardDescription={bigRegionNewCaseDes}
            iconName="corona"
            margin="0 1.5rem"
          />
        </CardWrapper>
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  height: 90%;
  ${(props) => props.theme.flex.column};
  justify-content: flex-start;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 25vh;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex.row};
  justify-content: center;
`;

export default Corona;
