type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type MainStackParamList = {};

type LoginScreenNavigationType = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;
type SignupScreenNavigationType = StackNavigationProp<
  AuthStackParamList,
  "Signup"
>;
type ChannelCreationScreenNavigationType = StackNavigationProp<
  MainStackParamList,
  "ChannelCreation"
>;

type ChannelScreenNavigationType = StackNavigationProp<
  MainStackParamList,
  "Channel"
>;

type ChannelListScreenNavigationType = StackNavigationProp<
  MainStackParamList,
  "ChannelList"
>;

type ProfileScreenNavigationType = StackNavigationProp<
  MainStackParamList,
  "Profile"
>;

export {
  LoginScreenNavigationType,
  SignupScreenNavigationType,
  ChannelCreationScreenNavigationType,
  ChannelScreenNavigationType,
  ChannelListScreenNavigationType,
  ProfileScreenNavigationType,
};
