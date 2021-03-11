import { JPlaceholderClient } from '../../http-client/instances';
import { httpResponse } from '../../http-client/http-response';
import { IClientUser } from '../../core/interfaces';
import { IHttpResponse } from '../../http-client/interfaces';

export async function getAllUsers(): Promise<IHttpResponse<IClientUser[] | null>> {
  try {
    const res = await JPlaceholderClient.get('/users');
    return httpResponse<IClientUser[]>(true, res.data, null);
  } catch (err) {
    return httpResponse<null>(true, null, err);   
  }
}