import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Title, Toast } from 'src/components/elements';
import { history, RootState } from 'src/redux/modules';
import { locationActions } from 'src/redux/modules/location';
import { weatherActions } from 'src/redux/modules/weather';
import { createNewUserId } from 'src/shared/common';
import styled from 'styled-components';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

const LocationAdd = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const [selectedBigRegion, setSelectedBigRegion] = useState<string>();
  const [selectedSmallRegion, setSelectedSmallRegion] = useState<string>();
  const [smallRegionList, setSmallRegionList] = useState<any>();
  const [toastMsg, setToastMsg] = useState<string>(null); // 토스트 메시지
  const [isShowToast, setIsShowToast] = useState<boolean>(false);
  const [timerState, setTimerState] = useState(null);

  const { allRegion, userLocationInfo, loading } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    dispatch(locationActions.fetchAllResions());
    if (!userLocationInfo) {
      dispatch(locationActions.fetchUserRegion());
    }
    return () => {
      clearTimeout(timerState);
      setIsShowToast(false);
    };
  }, []);

  const openToast = (msg) => {
    if (timerState) {
      clearTimeout(timerState);
    }
    setIsShowToast(true);
    setToastMsg(msg);

    const timer = setTimeout(() => {
      setIsShowToast(false);
    }, 3000);

    setTimerState(timer);
  };

  const onClickBigRegion = (region) => () => {
    setSelectedBigRegion(region);
    setSelectedSmallRegion(null);
  };

  const onClickSmallRegion = (region) => () => {
    setSelectedSmallRegion(region);
  };

  const bigRegionListComp = allRegion?.reduce((acc, cur, idx) => {
    if (cur.bigRegionName !== '이어도' && cur.bigRegionName !== '검역') {
      acc.push(
        <RegionEle
          key={idx}
          onClick={onClickBigRegion(cur.bigRegionName)}
          isSelected={selectedBigRegion === cur.bigRegionName}
        >
          {cur.bigRegionName}
        </RegionEle>,
      );
    }

    return acc;
  }, []);

  useEffect(() => {
    if (!selectedBigRegion) return;

    const list = allRegion.filter((r) => {
      return r.bigRegionName === selectedBigRegion;
    });

    setSmallRegionList(list[0].smallRegionList);
  }, [selectedBigRegion]);

  const smallRegionListCompo = smallRegionList?.map((r, idx) => {
    return (
      <RegionEle
        key={idx}
        onClick={onClickSmallRegion(r.smallRegionName)}
        isSelected={selectedSmallRegion === r.smallRegionName}
      >
        {r.smallRegionName}
      </RegionEle>
    );
  });
  const addUserRegion = async () => {
    if (!selectedBigRegion || !selectedSmallRegion) return;

    if (userLocationInfo?.oftenSeenRegions?.length >= 5) {
      openToast('최대 5개 지역까지만 추가할 수 있습니다');

      return;
    }

    const region = {
      bigRegionName: selectedBigRegion,
      smallRegionName: selectedSmallRegion,
    };
    let oftenSeenRegions;
    if (!userLocationInfo?.oftenSeenRegions) {
      oftenSeenRegions = [region];
    } else {
      oftenSeenRegions = [...userLocationInfo?.oftenSeenRegions, region];
    }

    await dispatch(locationActions.fetchUpdateUserRegion({ oftenSeenRegions }));
    history.replace('/setting/location');
  };

  const goBack = () => {
    history.replace('/setting/location');
  };

  return (
    <Container>
      <Title>지역선택</Title>
      <SelectBox>
        {bigRegionListComp}
        <Line />
        {selectedBigRegion && smallRegionListCompo}
      </SelectBox>
      <Grid jc="space-between" margin="1.5rem 0">
        <Button width="47%" _onClick={goBack}>
          이전
        </Button>
        <Button width="47%" disabled={!(selectedBigRegion && selectedSmallRegion)} _onClick={addUserRegion}>
          추가하기
        </Button>
      </Grid>
      {isShowToast && <Toast>{toastMsg}</Toast>}
      <BeatLoader color="#738FFF" loading={loading} css={spinnerStyle} />
    </Container>
  );
};

const Container = styled.div`
  width: 360px;
  height: 90%;
  ${(props) => props.theme.flex.column};
  justify-content: space-between;
  padding: 1.5rem 0 0 0;
  background-color: ${(props) => props.theme.color.background};
`;

const SelectBox = styled.div`
  ${(props) => props.theme.shadow};
  border: solid 0.5px ${(props) => props.theme.color.purple};
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem 0 0 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RegionEle = styled.span`
  background-color: ${(props) => (props.isSelected ? props.theme.color.sky3 : props.theme.color.gray0)};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  font-weight: bold;
  font-size: 1.4rem;
  margin: 3px;
  padding: 7px;
  ${(props) => props.theme.border_box};
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;
  transition: 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.color.sky3};
    color: white;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.purple};
  margin: 10px 0;
`;

const spinnerStyle = css`
  display: block;
  position: absolute;
  top: 50%;
  margin: 0 auto;
`;

export default LocationAdd;
