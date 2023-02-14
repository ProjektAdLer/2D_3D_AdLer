export interface IAsyncUsecase<TParams = void, TResponse = void> {
  executeAsync(data: TParams): Promise<TResponse>;
}
