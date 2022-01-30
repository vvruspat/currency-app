// Convert object to url string
export function getURIParams(params: Record<string, string>): string {
  const search = new URLSearchParams(params);

  return search.toString();
}

type FetchOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  mode: "cors";
  cache: "no-cache";
  credentials: "same-origin";
  headers: Record<string, string>;
  redirect: "follow";
  referrerPolicy: "no-referrer";
  body?: string;
};

// "fetch" wrapper
export const http = async (
  apiURL = "",
  data = {},
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  headers?: Record<string, string>
) => {
  let url = apiURL;

  try {
    const options: FetchOptions = {
      method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    if (method !== "GET") {
      options.body = getURIParams(data);
    } else {
      url += `?${getURIParams(data)}`;
    }

    const response = await fetch(url, options);

    const responseData = await response.json();

    if (response.status < 400) {
      return responseData;
    } else {
      throw new Error(`API Error. Status: ${response.status}`);
    }
  } catch (e) {
    throw e;
  }
};

// Network delay imitation
export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Response stub
export const accountsSuccessResponse = [
  {
    balance: Math.round(Math.random() * 100000) / 100,
    currency: "EUR",
  },
  {
    balance: Math.round(Math.random() * 1000000) / 100,
    currency: "USD",
  },
  {
    balance: Math.round(Math.random() * 10000) / 100,
    currency: "GBP",
  },
  {
    balance: Math.round(Math.random() * 100000) / 100,
    currency: "JPY",
  },
  {
    balance: Math.round(Math.random() * 1000) / 100,
    currency: "CAD",
  },
  {
    balance: Math.round(Math.random() * 100) / 100,
    currency: "CHF",
  },
];
