import firebase from "firebase";
import config from "../../firebase.json";

const app = firebase.initializeApp(config);

const Auth = app.auth();

interface loginProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: loginProps) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const signup = async ({ email, password }: loginProps) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  return user;
};
