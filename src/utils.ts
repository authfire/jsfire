import { AppCheck, getToken } from "firebase/app-check";

const postRequest = async (url: string, appCheck?: AppCheck, data: any = {}): Promise<Response> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  }

  if (appCheck) {
    const appCheckToken = await getToken(appCheck, true)
    headers['X-Firebase-AppCheck'] = appCheckToken.token
  }

  return await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    credentials: 'include',
  });
};

const getServerToken = async (serverTokenUrl: string, appCheck?: AppCheck): Promise<string> => {
  const response = await postRequest(serverTokenUrl, appCheck);

  if (!response.ok) {
    throw new Error("Failed to get server token: " + response.statusText);
  }

  const token = await response.json();
  if (!token.value) {
    throw new Error("No token received");
  }

  return token.value;

}

export { postRequest, getServerToken }
