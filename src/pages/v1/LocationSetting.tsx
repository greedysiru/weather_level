import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Grid, Title, Toast } from 'src/components/elements';

import styled from 'styled-components';

import { weatherActions } from 'src/redux/modules/weather';
import { locationActions } from 'src/redux/modules/location';

import { HiCheck, HiXCircle } from 'react-icons/hi';

import Footer from 'src/components/Footer';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

import { RootState } from '../../redux/modules';

const LocationSetting = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const { msg, loading } = useSelector((state: RootState) => state.common);
  const { userLocationInfo } = useSelector((state: RootState) => state.location);

  // 토스트 관련 state
  const [toastMsg, setToastMsg] = useState<string>(null);
  const [isShowToast, setIsShowToast] = useState<boolean>(false);

  // 위치관련 state
  const [currentRegion, setCurrentRegion] = useState<string>(null); // 현재위치
  const [selectedRegion, setSelectedRegion] = useState<string>(null); // 선택한 위치

  // 편집모드
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // 삭제할 지역 list - index[]
  const [deleteList, setDeleteList] = useState<number[]>([]);

  // setTImeout 관리할 state
  const [timerState, setTimerState] = useState<NodeJS.Timeout>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(locationActions.fetchUserRegion());

    return () => {
      setIsShowToast(false);
      clearTimeout(timerState);
    };
  }, []);

  // 사용자 지역정보
  useEffect(() => {
    if (userLocationInfo) {
      const current = userLocationInfo.currentRegion;
      const fullRegionName = `${current.bigRegionName} ${current.smallRegionName}`;
      setCurrentRegion(fullRegionName);

      setSelectedRegion(localStorage.getItem('current-region') || fullRegionName);
    }
  }, [userLocationInfo]);

  // toast event
  const openToast = (selfMsg) => {
    clearTimeout(timerState);

    if (selfMsg) {
      setToastMsg(selfMsg); // 메서드 parameter로 전달하는 msg
    } else {
      setToastMsg(msg); // redux msg
    }

    setIsShowToast(true);

    const timer = setTimeout(() => {
      setIsShowToast(false);
    }, 3000);

    setTimerState(timer);
  };

  // card를 클릭했을 때 - 컴포넌트 inline에서 분기하는 것 보다 분기하는 함수를 만드는게 나을 것 같음
  const onClickRegionCard = (idx, regionName, regionObj) => () => {
    if (isEditMode) {
      // 편집일 때 - 삭제.
      addDeleteList(idx, regionName, regionObj);
    } else {
      // 아닐 때 - 지역 선택
      selectRegion(regionName);
    }
  };
  // 선택한 카드 삭제 목록에 추가
  const addDeleteList = (idx, regionName, regionObj) => {
    if (selectedRegion === regionName) {
      openToast('선택한 위치는 삭제할 수 없습니다');
      return;
    }
    setDeleteList([...deleteList, idx]);
  };

  // 선택한 위치로 변경
  const selectRegion = async (region) => {
    setIsShowToast(false);

    await localStorage.setItem('current-region', region);
    setSelectedRegion(region);
    dispatch(weatherActions.getWeatherInfo());
    openToast('선택한 위치로 변경했습니다');
  };

  // 현재 위치로 변경
  const onClickCurrentRegion = async () => {
    setIsShowToast(false);
    if (isEditMode) return;

    await localStorage.removeItem('current-region');
    setSelectedRegion(currentRegion);
    openToast('현재 위치로 변경했습니다');

    dispatch(weatherActions.getWeatherInfo());
  };
  // 편집 - 취소 버튼 이벤트
  const onClickEditButton = () => {
    if (isEditMode) {
      cancleEdit();
    } else {
      toggleEditMode();
    }
  };
  // 편집버튼 event
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  // 취소버튼 event
  const cancleEdit = () => {
    setDeleteList([]);
    toggleEditMode();
  };
  // 추가/완료 버튼
  const onClickAddButton = () => {
    if (isEditMode) {
      // 편집 완료 버튼 이벤트
      deleteLocation();
    } else {
      // 추가 버튼 이벤트
      goToAddPage();
    }
  };

  // 지역 추가 페이지로 이동
  const goToAddPage = () => {
    history.push('/setting/location/add');
  };

  // 지역 목록 삭제
  const deleteLocation = async () => {
    if (deleteList.length > 0) {
      const oftenSeenRegions = userLocationInfo.oftenSeenRegions.filter((regObj, idx) => {
        return !deleteList.includes(idx);
      });

      await dispatch(locationActions.fetchUpdateUserRegion({ oftenSeenRegions }));
      setDeleteList([]);
      dispatch(locationActions.fetchUserRegion());

      await openToast(null); // redux msg 사용
    }

    toggleEditMode();
  };

  const IconComponent = () => {
    if (isEditMode) {
      return <HiXCircle className="cancel" />;
    }

    return <HiCheck className="check" />;
  };

  // card 목록 컴포넌트 list 렌더링
  const locationCardList = userLocationInfo?.oftenSeenRegions?.reduce((acc, cur, idx) => {
    const fullRegionName = `${cur.bigRegionName} ${cur.smallRegionName}`;
    const regionObj = { bigRegionName: cur.bigRegionName, smallRegionName: cur.smallRegionName };

    if (!deleteList.includes(idx)) {
      acc.push(
        <LocationCard
          onClick={onClickRegionCard(idx, fullRegionName, regionObj)}
          key={idx}
          isSelected={!isEditMode && selectedRegion === fullRegionName}
        >
          {fullRegionName}
          <IconComponent />
        </LocationCard>,
      );
    }

    return acc;
  }, []);

  return (
    <>
      <Container>
        <Header>
          <button type="button" onClick={onClickEditButton}>
            {isEditMode ? '취소' : '편집'}
          </button>
          <Title>위치 설정</Title>
          <button type="button" onClick={onClickAddButton}>
            {isEditMode ? '완료' : '추가'}
          </button>
        </Header>
        <Wrapper>
          <LocationCard
            onClick={onClickCurrentRegion}
            isSelected={!isEditMode && (!userLocationInfo?.latestRequestRegion || selectedRegion === currentRegion)}
          >
            <Grid isColumn>
              <span className="current">현재 위치</span>
              <span>{currentRegion}</span>
            </Grid>
            <HiCheck className="check" />
          </LocationCard>
          {locationCardList}
        </Wrapper>
        <Footer history={history} />
      </Container>
      {isShowToast && <Toast>{toastMsg}</Toast>}
      <BeatLoader color="#738FFF" loading={loading} css={spinnerStyle} />
    </>
  );
};

const Container = styled.div`
  width: 360px;
  height: 100%;
`;

const Header = styled.div`
  ${(props) => props.theme.flex.row};
  padding: 1.5rem 1rem;

  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.color.sky3};
    font-weight: 550;
    font-size: 1.6rem;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  ${(props) => props.theme.border_box};
  padding: 0 1rem;
`;

const LocationCard = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 15px;
  ${(props) => props.theme.shadow};
  border: solid 0.5px ${(props) => props.theme.color.purple};
  margin: 1rem 0;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex.row};
  padding: 1rem 1.5rem;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? props.theme.color.sky3 : 'white')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  transition: 0.3s ease;
  font-weight: bold;
  font-size: 1.6rem;
  & span.current {
    font-weight: normal;
    margin-bottom: 10px;
  }
  & svg.check {
    visibility: ${(props) => (props.isSelected ? 'visible' : 'hidden')};
    color: white;
    font-size: 2rem;
  }

  & svg.cancel {
    color: #ff3e00;
    font-size: 2.4rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.color.sky3};
  }
`;

const spinnerStyle = css`
  display: block;
  position: absolute;
  top: 50%;
  margin: 0 auto;
`;

export default LocationSetting;
