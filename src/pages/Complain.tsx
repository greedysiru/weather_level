import React, { useEffect, useState } from 'react';

import { Button, Grid, Input, Title, Toast } from 'src/components/elements';
import styled from 'styled-components';

import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
// RootState
import { commonActions } from 'src/redux/modules/common';
import { RootState } from '../redux/modules';

const Complain = (props) => {
  let timer;

  const dispatch = useDispatch();

  const { msg, loading } = useSelector((state: RootState) => state.common);

  const [title, setTitle] = useState(null);
  const [contents, setContents] = useState('');
  const [isShowToast, setIsShowToast] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  const openToast = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setIsShowToast(true);

    timer = setTimeout(() => {
      setIsShowToast(false);
    }, 3000);
  };

  const sendComplain = async () => {
    const data = {
      title,
      contents,
    };

    await dispatch(commonActions.fetchPostComplain(data));
    openToast();
  };

  return (
    <Container>
      <Title>불편/개선 사항 보내기</Title>
      <Input _onChange={onChangeTitle} />
      <Input _onChange={onChangeContents} value={contents} multiLine />
      <Button disabled={!title || !contents} _onClick={sendComplain}>
        보내기
      </Button>
      {isShowToast && <Toast>{msg}</Toast>}
      <BeatLoader color="#738FFF" loading={loading} css={spinnerStyle} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80%;
  padding: 1.5rem;
  ${(props) => props.theme.flex.column};
  justify-content: space-around;
`;

const spinnerStyle = css`
  display: block;
  position: absolute;
  top: 50%;
  margin: 0 auto;
`;

export default Complain;
