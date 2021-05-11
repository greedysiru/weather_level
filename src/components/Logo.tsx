import React from 'react';
import styled from 'styled-components';

// 로고 컴포넌트
const logo = '/assets/logo/logo.png';
const Logo = (props) => {
  return (
    <ElLogo />
  )
}

const ElLogo = styled.div`
  position:fixed;
  z-index: 3;
  background-image: url(${logo});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`



export default Logo;