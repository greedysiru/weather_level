import React from 'react';

import styled from 'styled-components';

// elements
import { Title, Image } from './elements';

const weatherFit = '/assets/weatherfit/weatherfit.png';
const Fit = (props) => {
  return (
    <>
      <Title>기온별 옷차림</Title>
      <FitWrap>
        <FitImage />
      </FitWrap>
    </>
  );
};



const FitWrap = styled.div`
width: 90%;
height: 85%;
margin: 0 auto 0 auto;
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
