export interface ISynchronousUsecase<TParams, TResponse = void> {
  execute(data?: TParams): TResponse;
}
