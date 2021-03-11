import { IDebit } from "../../core/interfaces";
import { httpResponse } from "../../http-client/http-response";
import { DebitClientApi } from "../../http-client/instances";
import { IHttpResponse } from "../../http-client/interfaces";

export async function createDebit(body: IDebit): Promise<IHttpResponse<null>> {
  try {
    const { data } = await DebitClientApi.post('/', { ...body });
    return httpResponse(true, data, null);
  } catch(err) {
    return httpResponse(false, null, err);
  }
}