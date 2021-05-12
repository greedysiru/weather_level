import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Text, Grid } from './index';

// 타입 지정
type RangeType = {
  label?: string;
  value?: string;
  isHidden?: boolean;
  rangeValue: string;
  setRangeValue: (string) => void;
};

const Range = (props: RangeType) => {
  const { label, value, isHidden, rangeValue, setRangeValue } = props;
  /* useEffect(() => {
    if (rangeValue !== value) {
      setRangeValue(value);
    }
  }, []); */

  useEffect(() => {
    console.log('value useEffect', label, value, rangeValue);
    setRangeValue(value);
  }, [value, label]);

  const onChangeRange = (e) => {
    setRangeValue(e.target.value);
  };

  return (
    <Container isHidden={isHidden}>
      <Grid ai="center" jc="space-between">
        {label && (
          <Label title="true" width="78px">
            {label}
          </Label>
        )}

        <ElRange type="range" min="0" max="100" value={rangeValue} onChange={onChangeRange} />
        <Label width="10px" margin="10px">
          {rangeValue}
        </Label>
      </Grid>
    </Container>
  );
};

Range.defaultProps = {
  label: '',
  value: '0',
  isHidden: false,
};

type LabelProps = {
  margin?: string;
  width?: string;
};

const Container = styled.div<{ isHidden: boolean }>`
  display: ${(props) => (props.isHidden ? 'none' : 'block')};
  width: 100%;
  height: 25px;

  /*  ${(props) => props.theme.flex.row} */
`;
const Label = styled.span<LabelProps>`
  margin: ${(props) => (props.margin ? props.margin : 0)};
  width: ${(props) => props.width};
  color: ${(props) => (props.title ? `black` : props.theme.color.gray3)};
`;

const ElRange = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  width: 65%;
  // 크롬
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: white;
    margin-top: -3.5px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    background-color: ${(props) => props.theme.color.sky3};
    border-radius: 5.5px;
    width: 100%;
    height: 11px;
  }
`;

export default Range;
