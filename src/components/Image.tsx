import React from 'react';
import styled from 'styled-components/native';


const Container = styled.View`
  align-self: center;
  width: 100px;
  height: 100px;
`;

const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
`;


interface IProps {
  url?: string,
  imageStyle?: {},
}

const Image: React.FC<IProps> = ({
  url,
  imageStyle
}) => {
  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} />
    </Container>
  )
};

export default Image;