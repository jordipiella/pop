export interface IApiResponse<T> {
  total: number | null;
  data: T[];
}
