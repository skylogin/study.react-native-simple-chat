import firebase from "firebase";
import "firebase/firestore";

import config from "../../firebase.json";

import type { TUser, TMessage } from "../types/chat";

const app = firebase.initializeApp(config);

const Auth = app.auth();
export const DB = firebase.firestore();

interface loginProps {
  email: string;
  password: string;
}

interface signupProps {
  name: string;
  photoUrl: string;
}

export const login = async ({ email, password }: loginProps) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

const uploadImage = async (uri: string) => {
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const user = Auth.currentUser;
  const ref = app.storage().ref(`/profile/${user?.uid}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: "image/png" });

  blob.close();
  return await snapshot.ref.getDownloadURL();
};

export const signup = async ({
  email,
  password,
  name,
  photoUrl,
}: loginProps & signupProps) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  const storageUrl = photoUrl.startsWith("https")
    ? photoUrl
    : await uploadImage(photoUrl);

  await user?.updateProfile({
    displayName: name,
    photoURL: storageUrl,
  });

  return user;
};

export const logout = async () => {
  return await Auth.signOut();
};

interface IUserProps {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export const getCurrentUser = () => {
  const user = Auth.currentUser;

  if (user) {
    let { uid, displayName, email, photoURL } = user;
    return { uid, name: displayName, email, photoUrl: photoURL };
  }

  return { uid: "", name: "", email: "", photoUrl: "" };
};

export const updateUserPhoto = async (photoUrl: string) => {
  const user = Auth.currentUser;
  const storageUrl = photoUrl.startsWith("https")
    ? photoUrl
    : await uploadImage(photoUrl);

  await user?.updateProfile({ photoURL: storageUrl });
  return {
    name: user?.displayName,
    email: user?.email,
    photoUrl: user?.photoURL,
  };
};

interface IChannel {
  title: string;
  description: string;
}

export const createChannel = async ({ title, description }: IChannel) => {
  const newChannelRef = DB.collection("channels").doc();
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description,
    createdAt: Date.now(),
  };

  await newChannelRef.set(newChannel);
  return id;
};

interface IMessage {
  channelId: string;
  message: TMessage;
}

export const createMessage = async ({ channelId, message }: IMessage) => {
  return await DB.collection("channels")
    .doc(channelId)
    .collection("messages")
    .doc(message._id)
    .set({
      ...message,
      createdAt: Date.now(),
    });
};
