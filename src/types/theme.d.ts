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
    inputDisabledBackground: string;
    errorText: string;
    buttonBackground: string;
    buttonTitle: string;
    buttonUnfilledTitle: string;
    buttonLogout: string;
    headerTintColor: string;
    tabActiveColor: string;
    tabInactiveColor: string;
    spinnerBackground: string;
    spinnerIndicator: string;
    listBorder: string;
    listTime: string;
    listDescription: string;
    listIcon: string;
    sendButtonActivate: string;
    sendButtonInactivate: string;
  }
}
