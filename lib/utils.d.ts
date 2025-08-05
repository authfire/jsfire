import { AppCheck } from "firebase/app-check";
declare const postRequest: (url: string, appCheck?: AppCheck, data?: any) => Promise<Response>;
declare const getServerToken: (serverTokenUrl: string) => Promise<string>;
export { postRequest, getServerToken };
