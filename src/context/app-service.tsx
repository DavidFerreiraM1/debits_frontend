import { DebitClientApi, JPlaceholderClient } from '../http-client/instances';
import { httpResponse } from '../http-client/http-response';
import { IClientUser, IDebit } from '../core/interfaces';
import { IHttpResponse } from '../http-client/interfaces';

export async function getAllUsers(): Promise<IHttpResponse<IClientUser[] | null>> {
  try {
    const res = await JPlaceholderClient.get('/users');
    return httpResponse<IClientUser[]>(true, res.data, null);
  } catch (err) {
    return httpResponse<null>(true, null, err);   
  }
}

export async function getAllDebits(): Promise<IHttpResponse<IDebit[] | null>> {
  try {
    const res = await DebitClientApi.get('/');
    return httpResponse<IDebit[]>(true, res.data.data, null);
  } catch (err) {
    return httpResponse<null>(false, null, err);
  }
}