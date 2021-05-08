import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from 'src/components/elements';
import { history, RootState } from 'src/redux/modules';
import { locationActions } from 'src/redux/modules/location';
import { createNewUserId } from 'src/shared/common';
import styled from 'styled-components';

const LocationAdd = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const [selectedBigRegion, setSelectedBigRegion] = useState<string>();
  const [selectedSmallRegion, setSelectedSmallRegion] = useState<string>();
  const [smallRegionList, setSmallRegionList] = useState<any>();
  const { allRegion, userLocationInfo } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    dispatch(locationActions.fetchAllResions());
  }, []);

  const onClickBigRegion = (region) => () => {
    setSelectedBigRegion(region);
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
    }
    /* if (userLocationInfo?.oftenSeenRegions.length > 5) {
      alert('최대 5개 지역까지만 추가할 수 있습니다');
      return;
    } */
    dispatch(locationActions.fetchCreateUserRegion({ region: `${selectedBigRegion} ${selectedSmallRegion}` }));
  };

  const goBack = () => {
    history.push('/setting/location');
  };
  return (
    <Container>
      <Title>지역선택</Title>
      <SelectBox>
        {bigRegionListComp}
        <Line />
        {selectedBigRegion && smallRegionListCompo}
      </SelectBox>
      <Grid>
        <Button _onClick={goBack}>이전</Button>
        <Button disabled={!(selectedBigRegion && selectedSmallRegion)} _onClick={addUserRegion}>
          추가하기
        </Button>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  width: 360px;
  border: 1px solid black;
  height: 100%;
  ${(props) => props.theme.flex.column};
  justify-content: space-around;
  padding: 1rem;
  background-color: ${(props) => props.theme.color.background};
`;

const Title = styled.div``;

const SelectBox = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  width: 100%;
  height: 50%;
  padding: 1rem;
  border-radius: 1rem;
`;

const RegionEle = styled.span`
  background-color: ${(props) => (props.isSelected ? props.theme.color.sky3 : props.theme.color.gray0)};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  font-weight: bold;
  margin: 3px;
  padding: 2px 5px;
  ${(props) => props.theme.border_box}
  border-radius:10px;
  cursor: pointer;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: red;
  margin: 10px 0;
`;

export default LocationAdd;
