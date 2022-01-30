import { accountsSuccessResponse, timeout } from "./utils";

// This API is stubbed, case the lack of backend
export const fetchAccountsApi = async () => {
  await timeout(3000);

  return accountsSuccessResponse;
};
