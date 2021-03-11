export interface IHttpResponse<T> {
  success: boolean;
  data: T;
  error: unknown;
}