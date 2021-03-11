import { IHttpResponse } from './interfaces';

export function httpResponse<T>(success: boolean, data: T, error: unknown ): IHttpResponse<T> {
  return {
    success,
    data,
    error
  }
}