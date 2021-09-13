import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    imageBackground: string;
    imageButtonBackground: string;
    imageButtonIcon: string;
    label: string;
    inputPlaceholder: string;
    inputBorder: string;
    errorText: string;
    buttonBackground: string;
    buttonTitle: string;
    buttonUnfilledTitle: string;
    headerTintColor: string;
  }
}
