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
  useEffect(() => {
    if (!rangeValue) {
      setRangeValue(value);
    }
  }, [value]);

  const onChangeRange = (e) => {
    setRangeValue(e.target.value);
  };

  return (
    <Container isHidden={isHidden}>
      <Grid ai="center" jc="space-between">
        {label && (
          <Label title width="100px">
            {label}
          </Label>
        )}

        <ElRange type="range" min="0" max="100" defaultValue={value} onChange={onChangeRange} />
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
  border: 1px splid #212121;
  width: 65%;
  padding: 12px 4px;
  box-sizing: border-box;
  background-color: red;
`;

export default Range;
