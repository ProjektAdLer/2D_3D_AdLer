export interface IAsyncUsecase {
  executeAsync(data?: object): Promise<void>;
}
