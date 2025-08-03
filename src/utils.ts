import { getAppCheck, getAppCheckToken } from "./app-check";

const postRequest = async (url: string, data?: any): Promise<Response> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  }

  if (getAppCheck()) {
    headers['X-Firebase-AppCheck'] = await getAppCheckToken();
  }

  return await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    credentials: 'include',
  });
};

export { postRequest }
