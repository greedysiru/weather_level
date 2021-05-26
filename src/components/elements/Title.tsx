import React from 'react';
import styled from 'styled-components';

// 제목 컴포넌트
// 폰트 크기, 마진, 굵기 설정되어 있음
const Title = (props) => {
  const { children } = props;
  return <Ele>{children}</Ele>;
};

const Ele = styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin: 1.5rem;
  font-weight: bold;
`;
export default Title;
