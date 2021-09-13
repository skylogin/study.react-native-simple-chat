import React from 'react';
import styled from 'styled-components/native';


const Container = styled.View`
  align-self: center;
  width: 100px;
  height: 100px;
`;

const StyledImage = styled.Image<{ rounded: boolean }>`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded? 50: 0)}px;
`;


interface IProps {
  url?: string,
  imageStyle?: {},
  rounded?: boolean,
}

const Image: React.FC<IProps> = ({
  url,
  imageStyle,
  rounded = false,
}) => {
  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded} />
    </Container>
  )
};

export default Image;