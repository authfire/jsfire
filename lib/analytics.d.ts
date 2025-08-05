import { Analytics } from "firebase/analytics";
export declare const logEvent: (analytics: Analytics | undefined, eventName: string, eventParams?: Record<string, any>) => void;
