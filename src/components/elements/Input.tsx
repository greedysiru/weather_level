import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

// 타입 지정
type InputType = {
  label?: string;
  placeholder?: string;
  type?: string;
  multiLine?: boolean;
  value?: string;
  isSubmit?: boolean;
  _onChange?: (e) => void;
  onSubmit?: () => void;
}


const Input = (props: InputType) => {
  const { label, placeholder, _onChange, type, multiLine, value, isSubmit, onSubmit } = props;
  if (multiLine) {
    return (
      <>
        <Grid>
          {label && <Text margin="0px">{label}</Text>}
          <ElTextarea
            value={value}
            rows={10}
            placeholder={placeholder}
            onChange={_onChange} />
        </Grid>
      </>
    )
  }

  return (
    <>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {isSubmit ?
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
    </>
  )
}

Input.defaultProps = {
  multiLine: false,
  label: "",
  placeholder: '텍스트를 입력해주세요',
  type: "text",
  value: "",
  isSubmit: false,
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