interface RequestObject {
  url: string;
  method: string;
  [key: string]: any;
}

interface ResponseObject {
  status: (status: number) => ResponseObject;
  send?: any;
  [key: string]: any;
}
