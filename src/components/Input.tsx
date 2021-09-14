import React, { useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const Label = styled.Text<{isFocused: boolean}>`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme, isFocused }) => (isFocused? theme.text: theme.label)};
`;

const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))<{isFocused: boolean}>`
  background-color: ${({ theme, editable }) => editable? theme.background: theme.inputDisabledBackground};
  color: ${({ theme }) => theme.text};
  padding: 20px 10px;
  font-size: 16px;
  border: 1px solid ${({ theme, isFocused }) => (isFocused? theme.text: theme.inputBorder)};
  border-radius: 4px;
`;


interface IProps {
  label: string;
  value: string;
  onChangeText?: (text:string) => void;
  onSubmitEditing?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  isPassword?: boolean;
  returnKeyType?: "done" | "next";
  maxLength?: number;
  disabled: boolean;
}


const Input: React.FC<IProps> = ({
  label,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur = () => {},
  placeholder,
  isPassword,
  returnKeyType,
  maxLength,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <Label isFocused={isFocused}>
        {label}
      </Label>
      <StyledTextInput
        isFocused={isFocused}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none"
        underlineColorAndroid="transparent"
        editable={!disabled}
      />
    </Container>
  )
};

export default Input;