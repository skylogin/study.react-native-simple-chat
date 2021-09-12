import React from 'react';
import styled from 'styled-components/native';

const TRANSPARENT = 'transparent';

const Container = styled.TouchableOpacity<{ isFilled: boolean}>`
  background-color: ${({ theme, isFilled }) => isFilled? theme.buttonBackground: TRANSPARENT};
  align-items: center;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  opacity: ${({ disabled }) => (disabled? 0.5: 1)}
`;

const Title = styled.Text<{ isFilled: boolean}>`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme, isFilled }) => isFilled? theme.buttonTitle: theme.buttonUnfilledTitle};
`;

interface IProps {
  containerStyle?: {};
  title: string;
  onPress: () => void;
  isFilled?: boolean;
  disabled?: boolean
}

const Button: React.FC<IProps> = ({
  containerStyle,
  title,
  onPress,
  isFilled = true,
  disabled,
}) => {

  return (
    <Container style={containerStyle} onPress={onPress} isFilled={isFilled} disabled={disabled}>
      <Title isFilled={isFilled}>{title}</Title>
    </Container>
  )
};

export default Button;