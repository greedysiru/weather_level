import { Range } from 'components/elements';
import React from 'react';
import styled from 'styled-components'

const Setting = (props) => {
  return (
    <Container>
      <Range />
    </Container>
  )
}

const Container = styled.div`
  
  width:50%;
  border:1px solid black;
  height:100%;
`
export default Setting;