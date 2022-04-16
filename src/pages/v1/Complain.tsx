import React, { useEffect, useState } from 'react';

import { Button, Grid, Image, Title, Toast } from 'src/components/elements';
import styled from 'styled-components';

import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
// RootState
import { commonActions } from 'src/redux/modules/common';
import { RootState } from '../../redux/modules';

// 로고 불러오기
const logo = '/assets/logo/logo_circle.png';
const Complain = (props) => {
  const { history } = props;
  let timer;

  const dispatch = useDispatch();

  const { msg, loading } = useSelector((state: RootState) => state.common);

  const [title, setTitle] = useState('');
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
    setTitle('');
    setContents('');
  };
  const goBack = () => {
    history.replace('/setting');
  };
  return (
    <Container>
      <Title>불편/개선 사항 보내기</Title>
      <Grid width="10rem">
        <ElLogo />
      </Grid>
      <InputEl value={title} placeholder="제목" onChange={onChangeTitle} />
      <TextAreaEl
        placeholder="불편한 점이나 개선사항을 알려주세요 :)"
        onChange={onChangeContents}
        value={contents}
        multiLine
      />
      <Grid jc="space-between" margin="2rem 0 0 0">
        <Button width="47%" _onClick={goBack}>
          취소
        </Button>

        <Button width="47%" disabled={!title || !contents} _onClick={sendComplain}>
          제출하기
        </Button>
      </Grid>

      {isShowToast && <Toast>{msg}</Toast>}
      <BeatLoader color="#738FFF" loading={loading} css={spinnerStyle} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 360px;
  height: 90%;
  padding: 1.5rem;
  ${(props) => props.theme.flex.column};
  align-items: center;
  justify-content: center;
  margin: auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ElLogo = styled.div`
  background-image: url(${logo});
  width: 7.4rem;
  height: 7.4rem;
  background-size: contain;
  background-position: center center;
`;

const spinnerStyle = css`
  display: block;
  position: absolute;
  top: 50%;
  margin: 0 auto;
`;

const InputEl = styled.input`
  border: 0.5px solid ${(props) => props.theme.color.purple};
  border-radius: 14px;
  ${(props) => props.theme.shadow};
  width: 100%;
  height: 50px;
  padding: 1.5rem;
  ${(props) => props.theme.border_box}
  margin-top: 2rem;

  &::placeholder {
    color: ${(props) => props.theme.color.gray2};
  }

  &:focus {
    outline: none;
  }
`;

const TextAreaEl = styled.textarea`
  border: 0.5px solid ${(props) => props.theme.color.purple};
  border-radius: 14px;
  ${(props) => props.theme.shadow};
  width: 100%;
  height: 20%;
  min-height: 120px;
  padding: 1.5rem;
  ${(props) => props.theme.border_box};
  resize: none;
  margin-top: 2rem;

  &::placeholder {
    color: ${(props) => props.theme.color.gray2};
  }

  &:focus {
    outline: none;
  }
`;
export default Complain;
