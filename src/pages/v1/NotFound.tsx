import React from 'react';


// NotFound
// 존재하지 않는 경로로 접속시 사용자에게 보여주는 컴포넌트
const NotFound = (props) => {
  const { history } = props;
  // 뒤로 돌아가게 하는 함수
  const moveToback = () => {
    history.goBack();
  }
  // 1.5초뒤에 /back으로 이동
  React.useEffect(() => {
    setTimeout(moveToback, 1500);
  }, []);
  return '잘못된 경로입니다.'
}

export default NotFound;