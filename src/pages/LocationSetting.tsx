import { current } from 'immer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Toast } from 'src/components/elements';
import { locationActions } from 'src/redux/modules/location';
import styled from 'styled-components';
import { HiCheck } from 'react-icons/hi';
import Footer from 'src/components/Footer';

import { RootState } from '../redux/modules';

const LocationSetting = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [currentRegion, setCurrentRegion] = useState(null); // 현재위치
  const [selectedRegion, setSelectedRegion] = useState(null); // 마지막위치
  const [isShowToast, setIsShowToast] = useState<boolean>(false);
  const userLocationInfo = useSelector((state: RootState) => state.location.userLocationInfo);
  useEffect(() => {
    dispatch(locationActions.fetchUserRegion());
  }, []);

  useEffect(() => {
    if (userLocationInfo) {
      const current = userLocationInfo.currentRegion;
      setCurrentRegion(current);

      setSelectedRegion(localStorage.getItem('current-region') || current);
    }
  }, [userLocationInfo]);

  // 위도 경도 localStorage에 저장
  const setLocation = (latitude: string, longitude: string) => {
    localStorage.setItem('longitude', longitude);
    localStorage.setItem('latitude', latitude);
  };

  const openToast = () => {
    setIsShowToast(true);
    const timer = setTimeout(() => {
      setIsShowToast(false);
    }, 3000);
  };

  const goAddPage = () => {
    history.push('/setting/location/add');
  };
  const onClickRegionCard = (region) => () => {
    localStorage.setItem('current-region', region);
    setSelectedRegion(region);
    openToast();
  };
  const locationCardList = userLocationInfo?.saveRegions?.map((loc, idx) => {
    return (
      <LocationCard onClick={onClickRegionCard(loc)} key={idx} isSelected={selectedRegion === loc}>
        {loc} <HiCheck />
      </LocationCard>
    );
  });

  return (
    <>
      <Container>
        <Grid width="100%">
          <span>위치 설정</span>
          <button type="button" onClick={goAddPage}>
            추가
          </button>
        </Grid>
        <Wrapper>
          <LocationCard isSelected={selectedRegion === currentRegion}>
            <Grid isColumn>
              <span>현재 위치</span>
              <span>{currentRegion}</span>
            </Grid>
            <HiCheck />
          </LocationCard>
          {locationCardList}
        </Wrapper>
      </Container>

      <Footer history={history} />

      {isShowToast && <Toast>위치가 변경되었습니다</Toast>}
    </>
  );
};

const Container = styled.div`
  width: 360px;
  height: 100%;
`;

const Title = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  ${(props) => props.theme.border_box};
  padding: 1rem;
`;

const LocationCard = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: solid 0.5px ${(props) => props.theme.color.purple};
  margin: 1rem 0;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex.row};
  padding: 1rem 1.5rem;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? props.theme.color.sky3 : 'white')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  transition: 0.3s ease;

  & svg {
    visibility: ${(props) => (props.isSelected ? 'visible' : 'hidden')};
    color: white;
  }

  &:hover {
    background-color: ${(props) => props.theme.color.sky3};
  }
`;

export default LocationSetting;
