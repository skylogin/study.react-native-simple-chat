import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    imageBackground: string;
    label: string;
    inputPlaceholder: string;
    inputBorder: string;
    errorText: string;
    buttonBackground: string;
    buttonTitle: string;
    buttonUnfilledTitle: string;
  }
}
