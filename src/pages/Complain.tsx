import React, { useEffect, useState } from 'react';

import { Button, Grid, Image, Title, Toast } from 'src/components/elements';
import styled from 'styled-components';

import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
// RootState
import { commonActions } from 'src/redux/modules/common';
import { RootState } from '../redux/modules';

const Complain = (props) => {
  const { history } = props;
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
  const goBack = () => {
    history.replace('/setting');
  };
  return (
    <Container>
      <Grid isColumn height="60%" jc="space-between" ai="center">
        <Title>불편/개선 사항 보내기</Title>
        <Logo />
        <InputEl value={title} placeholder="제목" onChange={onChangeTitle} />
        <TextAreaEl
          placeholder="불편한 점이나 개선사항을 알려주세요 :)"
          onChange={onChangeContents}
          value={contents}
          multiLine
        />
        <Grid jc="space-between">
          <Button width="47%" _onClick={goBack}>
            취소
          </Button>
          <Button width="47%" disabled={!title || !contents} _onClick={sendComplain}>
            제출하기
          </Button>
        </Grid>

        {isShowToast && <Toast>{msg}</Toast>}
        <BeatLoader color="#738FFF" loading={loading} css={spinnerStyle} />
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  ${(props) => props.theme.flex.row};
  align-items: center;
`;

const spinnerStyle = css`
  display: block;
  position: absolute;
  top: 50%;
  margin: 0 auto;
`;

const Logo = styled.div`
  background-image: url('/assets/logo/logo512.png');
  width: 10rem;
  height: 10rem;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

const InputEl = styled.input`
  border: 0.5px solid ${(props) => props.theme.color.purple};
  border-radius: 14px;
  box-shadow: ${(props) => props.theme.shadow};
  width: 100%;
  height: 50px;
  padding: 1.5rem;
  ${(props) => props.theme.border_box}

  &::placeholder {
    color: ${(props) => props.theme.color.gray2};
    font-weight: 550;
  }

  &:focus {
    outline: none;
  }
`;

const TextAreaEl = styled.textarea`
  border: 0.5px solid ${(props) => props.theme.color.purple};
  border-radius: 14px;
  box-shadow: ${(props) => props.theme.shadow};
  width: 100%;
  height: 35%;
  padding: 1.5rem;
  ${(props) => props.theme.border_box}
  resize:none;

  &::placeholder {
    color: ${(props) => props.theme.color.gray2};
    font-weight: 550;
  }

  &:focus {
    outline: none;
  }
`;
export default Complain;
