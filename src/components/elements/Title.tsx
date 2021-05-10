import React from 'react';
import styled from 'styled-components';

const Title = (props) => {
  const { children } = props;
  return <Ele>{children}</Ele>;
};

const Ele = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 1rem;
  font-weight: bold;
`;
export default Title;
