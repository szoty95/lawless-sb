export type EmptyReq = undefined;

export type WithAuth<T = any> = {
  authToken: string;
  data?: T;
};

export interface Image {
  previewPicture: string;
}
