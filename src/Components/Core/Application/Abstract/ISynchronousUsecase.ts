export interface ISynchronousUsecase<TParams> {
  execute(data?: TParams): void;
}
