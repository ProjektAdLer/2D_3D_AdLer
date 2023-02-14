export interface ISynchronousUsecase<TParams = void, TResponse = void> {
  execute(data: TParams): TResponse;
}
