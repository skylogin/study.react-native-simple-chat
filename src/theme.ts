import { DefaultTheme } from "styled-components/native";

type colorType = {
  white: string;
  black: string;
  grey_0: string;
  grey_1: string;
  red: string;
  blue: string;
};

const colors: colorType = {
  white: "#ffffff",
  black: "#000000",
  grey_0: "#d5d5d5",
  grey_1: "#a6a6a6",
  red: "#e84118",
  blue: "#3679fe",
};

export const theme: DefaultTheme = {
  background: colors.white,
  text: colors.black,
  imageBackground: colors.white,
  label: colors.grey_1,
  inputPlaceholder: colors.grey_1,
  inputBorder: colors.grey_1,
  errorText: colors.red,
  buttonBackground: colors.blue,
  buttonTitle: colors.white,
  buttonUnfilledTitle: colors.blue,
  headerTintColor: colors.black,
  imageButtonBackground: colors.grey_1,
  imageButtonIcon: colors.white,
  spinnerBackground: colors.black,
  spinnerIndicator: colors.white,
  tabActiveColor: colors.blue,
  tabInactiveColor: colors.grey_1,
  buttonLogout: colors.red,
};
