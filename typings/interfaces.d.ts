// For shared global interface types.

declare global {
  interface IUser {
    id: string;
    userName: string;
  }
}

export type ExpressRequestUser = IUser;
