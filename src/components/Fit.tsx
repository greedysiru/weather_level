import React from 'react';

import styled from 'styled-components';

// elements
import { Title, Image } from './elements';

const weatherFit = '/assets/weatherfit/weatherfit.jpg';
const Fit = (props) => {
  return (
    <Container>
      <Title>기온별 옷차림</Title>
      <FitWrap>
        <FitImage />
      </FitWrap>
    </Container>
  );
};

const Container = styled.div`
${(props) => props.theme.flex.column};
width: 100%;
height: 100%;
padding: 1.5rem;
justify-content: center;
`

const FitWrap = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: white;
border-radius: 15.5px;
border: 1px solid ${(props) => props.theme.color.purple};
`;

const FitImage = styled.div`
background-image: url(${weatherFit});
width: 90%;
height: 90%;
background-size: contain;
background-repeat: no-repeat;
background-position: center center;
`
export default Fit;
