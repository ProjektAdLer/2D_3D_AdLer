export interface IInternalSynchronousUsecase<TParams = void, TResponse = void> {
  internalExecute(data: TParams): TResponse;
}
