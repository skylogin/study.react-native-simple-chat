export type TUser = {
  _id: string;
  avatar: string;
  name: string;
};
export type TMessage = {
  _id: string;
  text: string;
  createdAt: Date | number;
  user: TUser;
};
