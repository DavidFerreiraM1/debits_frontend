import { IDebit } from "../../core/interfaces";
import { httpResponse } from "../../http-client/http-response";
import { DebitClientApi } from "../../http-client/instances";
import { IHttpResponse } from "../../http-client/interfaces";

export async function createDebit(body: IDebit): Promise<IHttpResponse<null>> {
  try {
    const { data } = await DebitClientApi.post('/', { ...body });
    return httpResponse(true, data.data, null);
  } catch(err) {
    return httpResponse(false, null, err);
  }
}

export async function getDebitById(id: number): Promise<IHttpResponse<IDebit | null>> {
  try {
    const { data } = await DebitClientApi.get(`/?id=${id}`);
    return httpResponse(true, data.data, null);
  } catch(err) {
    return httpResponse(false, null, err);
  }
}

export async function updateDebit(id: number, body: IDebit): Promise<IHttpResponse<IDebit | null>> {
  try {
    await DebitClientApi.put(`/${id}`, body);
    return httpResponse(true, null, null);
  } catch(err) {
    return httpResponse(false, null, err);
  }
}