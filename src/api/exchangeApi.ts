import { http } from "./utils";

// Such keys is better to store in ENV on backend and doing requests through our backend
const apiKey = "d41078c3b4ef9999b197";
const apiServer = "https://free.currconv.com/api/v7/convert";

// Request exchange rates from free.currconv.com
// Attention!!! Free requests limit is 100 req/hour
export const fetchExchangeRatesApi = async (from: string, to: string) => {
  const data = {
    q: `${from}_${to}`,
    compact: "ultra",
    apiKey: apiKey,
  };

  return http(apiServer, data, "GET");
};
