import React from 'react';
import styled from 'styled-components';

// 로고 컴포넌트
const logo = '/assets/logo/logo.png';
const Logo = (props) => {
  return (
    <LogoWrap>
      <ElLogo />
    </LogoWrap>
  )
}

const ElLogo = styled.div`
  position:fixed;
  background-image: url(${logo});
  width: 200px;
  height: 200px;
  background-size: contain;
  background-position: center center;
`
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position:fixed;
  z-index: 11;
  width:  100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.sky3};
  background-position: center center;
`


export default Logo;