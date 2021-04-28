import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

// 타입 지정
type InputType = {
  label: string;
  placeholder: string;
  type: string;
  multiLine: boolean;
  value: string;
  is_submit: boolean;
  _onChange: () => void;
  onSubmit: () => void;
}


const Input = (props: InputType) => {
  const { label, placeholder, _onChange, type, multiLine, value, is_submit, onSubmit } = props;
  if (multiLine) {
    return (
      <React.Fragment>
        <Grid>
          {label && <Text margin="0px">{label}</Text>}
          <ElTextarea
            value={value}
            rows={10}
            placeholder={placeholder}
            onChange={_onChange} ></ElTextarea>
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {is_submit ?
          (<ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                console.log('키')
                onSubmit();
              }
            }}
          />) :
          (<ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
          />)}

      </Grid>
    </React.Fragment>
  )
}

Input.defaultProps = {
  multiLine: false,
  label: "",
  placeholder: '텍스트를 입력해주세요',
  type: "text",
  value: "",
  is_submit: false,
  _onChange: () => { },
  onSubmit: () => { },
}



const ElTextarea = styled.textarea`
  border: 1px splid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px splid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;