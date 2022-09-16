export interface IAsyncUsecase<TParams, TResponse> {
  executeAsync(data?: TParams): Promise<TResponse>;
}
