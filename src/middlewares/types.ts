export interface RequestObject {
  url: string;
  method: string;
  [key: string]: any;
}

export interface ResponseObject {
  status: (status: number) => ResponseObject;
  send?: any;
  [key: string]: any;
}
