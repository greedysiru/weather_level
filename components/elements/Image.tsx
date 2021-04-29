import styled from 'styled-components';
import React from 'react';

type ImageType = {  
  src:string;
  size:number ;
  shape:string;
}

const Image = (props:ImageType) => {
  const { shape, src, size } = props;

  const styles = { src,size,shape }
  
  if (shape === 'circle') {
    return (
      <ImageCircle {...styles}></ImageCircle>
    )
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles} ></AspectInner>
      </AspectOutter>
    )
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles} ></ImageDefault>
    </React.Fragment>
  )
}

Image.defaultProps = {
  shape: "circle",
  src: "https://avatars.githubusercontent.com/u/75150027?v=4",
  size: 36,
};

const ImageDefault = styled.div<ImageType>`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div<ImageType>`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div<ImageType>`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`;

export default Image;