export interface IInternalAsyncUsecase<TParams = void, TResponse = void> {
  internalExecuteAsync(data: TParams): Promise<TResponse>;
}
