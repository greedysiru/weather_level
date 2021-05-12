import styled from 'styled-components';
import React from 'react';

type IconType = {
  name?: string;
  size?: number;
  color?: string;
}

const Icon = (props: IconType) => {
  const { name, size } = props;

  const styles = { name, size }

  return (
    <IconWrap>
      <Svg {...styles} />
    </IconWrap>
  )
}

Icon.defaultProps = {
  name: "",
  size: 3,
  color: "",
};


const Svg = styled.svg<IconType>`
--size: ${(props) => props.size}rem;
width: var(--size);
height: var(--size);
background-image: url("/assets/icons/i_${(props) => props.name}.svg");

`

const IconWrap = styled.div`
&:svg {
      color:red
} 
`


export default Icon;