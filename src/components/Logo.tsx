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
  z-index: 3;
  background-image: url(${logo});
  width: 375px;
  height: 812px;
  background-size: auto;
  background-position: center center;
`
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  position:fixed;
  z-index: 3;
  width:  100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.sky3}
`


export default Logo;