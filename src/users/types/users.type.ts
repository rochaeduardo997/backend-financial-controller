export type TUser = {
  id: number;
  status?: boolean;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: TUser;
};
