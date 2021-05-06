import React from 'react';
import styled from 'styled-components';

import logo from '../static/images/logo.png'

// 로고 컴포넌트
const Logo = (props) => {
  console.log(props)
  const { history } = props;
  // main 페이지로 넘어가는 함수
  const moveToMain = () => {
    history.push('/main')
  }
  React.useEffect(() => {
    setTimeout(moveToMain, 1500);
  }, [])
  return (
    <ElLogo />
  )
}

const ElLogo = styled.div`
  background-image: url(${logo});
  width: 100%;
  height: 100%;
`



export default Logo;