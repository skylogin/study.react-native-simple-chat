import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type MainStackParamList = {
  Channels: undefined;
  Profile: undefined;
  Channel: { id: string; title: string };
  "Channel Creation": undefined;
};

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
  "Channels"
>;

type ProfileScreenNavigationType = StackNavigationProp<
  MainStackParamList,
  "Profile"
>;

type MainTabNavigationType = StackNavigationProp<
  MainStackParamList,
  "Channels"
>;

type MainTabRouteProp = RouteProp<MainStackParamList, "Channels">;
type ChannelRouteProp = RouteProp<MainStackParamList, "Channel">;

export {
  LoginScreenNavigationType,
  SignupScreenNavigationType,
  ChannelCreationScreenNavigationType,
  ChannelScreenNavigationType,
  ChannelListScreenNavigationType,
  ProfileScreenNavigationType,
  MainTabNavigationType,
  MainTabRouteProp,
  ChannelRouteProp,
};
