import { httpResponse } from "../../http-client/http-response";
import { DebitClientApi } from "../../http-client/instances";

export async function RemoveDebit(id: number) {
  try {
    await DebitClientApi.delete(`/${id}`);
    return httpResponse(true, null, null);
  } catch (err) {
    return httpResponse(false, null, null);
  }
}