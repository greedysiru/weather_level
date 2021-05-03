import styled from 'styled-components';
import React from 'react';

type ImageType = {
  shape?: string;
  src?: string;
  size?: number;
}

const Image = (props: ImageType) => {
  const { shape, src, size } = props;

  const styles = { src, size, shape }

  if (shape === 'circle') {
    return (
      <ImageCircle {...styles} />
    )
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles} />
      </AspectOutter>
    )
  }

  return (

    <ImageDefault {...styles} />

  )
}

Image.defaultProps = {
  shape: "circle",
  src: "https://tistory4.daumcdn.net/tistory/4367973/attach/059c57a4a960451fad4115308781a782",
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