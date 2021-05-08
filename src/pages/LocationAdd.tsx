import React from 'react';
import { Button, Grid } from 'src/components/elements';
import { history } from 'src/redux/modules';
import styled from 'styled-components';

const LocationAdd = (props) => {
  return (
    <Container>
      <Title>지역선택</Title>
      <SelectBox>
        <RegionEle>서울시</RegionEle>
        <Line />
        <RegionEle>중구</RegionEle>
        <RegionEle>종로구</RegionEle>
        <RegionEle>서대문구</RegionEle>
      </SelectBox>
      <Grid>
        <Button _onClick={() => history.goBack()}>이전</Button>
        <Button>선택 완료</Button>
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
`;

const Title = styled.div``;

const SelectBox = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  width: 100%;
  height: 50%;
`;

const RegionEle = styled.span`
  background-color: purple;
  color: white;
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
