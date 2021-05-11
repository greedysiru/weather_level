import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Title, Toast } from 'src/components/elements';
import Spinner from 'src/components/Spinner';
import { history, RootState } from 'src/redux/modules';
import { locationActions } from 'src/redux/modules/location';
import { weatherActions } from 'src/redux/modules/weather';
import { createNewUserId } from 'src/shared/common';
import styled from 'styled-components';

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

  const bigRegionListComp = allRegion?.map((r, idx) => {
    return (
      <RegionEle
        key={idx}
        onClick={onClickBigRegion(r.bigRegionName)}
        isSelected={selectedBigRegion === r.bigRegionName}
      >
        {r.bigRegionName}
      </RegionEle>
    );
  });

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
  const addUserRegion = () => {
    if (!selectedBigRegion || !selectedSmallRegion) return;

    if (!localStorage.getItem('weather-level')) {
      const id = createNewUserId();
      localStorage.setItem('weather-level', id);
      console.log('생성');
    }
    if (userLocationInfo?.oftenSeenRegions?.length >= 5) {
      openToast('최대 5개 지역까지만 추가할 수 있습니다');

      return;
    }

    const region = [`${selectedBigRegion} ${selectedSmallRegion}`];
    dispatch(locationActions.fetchCreateUserRegion({ region }));
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
      <Grid jc="space-between">
        <Button width="46%" _onClick={goBack}>
          이전
        </Button>
        <Button width="46%" disabled={!(selectedBigRegion && selectedSmallRegion)} _onClick={addUserRegion}>
          추가하기
        </Button>
      </Grid>
      {isShowToast && <Toast>{toastMsg}</Toast>}
      {loading && <Spinner />}
    </Container>
  );
};

const Container = styled.div`
  width: 360px;
  height: 80%;
  ${(props) => props.theme.flex.column};
  justify-content: flex-start;
  padding: 1rem;
  background-color: ${(props) => props.theme.color.background};
`;

const SelectBox = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: solid 0.5px ${(props) => props.theme.color.purple};
  background-color: white;
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  margin: 4rem 0;
`;

const RegionEle = styled.span`
  background-color: ${(props) => (props.isSelected ? props.theme.color.sky3 : props.theme.color.gray0)};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  font-weight: bold;
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

export default LocationAdd;
