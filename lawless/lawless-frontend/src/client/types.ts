export type EmptyReq = undefined;

export type WithAuth<T = any> = {
  authToken: string;
  data?: T;
};
