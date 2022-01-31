import { http } from "./utils";

// Such keys is better to store in ENV on backend and doing requests through backend
const apiKey = "fb5342294e594f8090b9dbadc15bb9f1";
const apiServer = "https://api.currconv.com/api/v7/convert";

// Request exchange rates from free.currconv.com
// Attention!!! For my account requests limit is 500 req/hour
export const fetchExchangeRatesApi = async (from: string, to: string) => {
  const data = {
    q: `${from}_${to}`,
    compact: "ultra",
    apiKey: apiKey,
  };

  return http(apiServer, data, "GET");
};
