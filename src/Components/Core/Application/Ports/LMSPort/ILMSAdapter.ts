export default interface ILMSAdapter {
  onLoginSuccessful?(userName: string): void;
  onLoginFailure?(errorMessage: string, errorMessageAdvise: string): void;
  onLogoutSuccessful?(): void;
}
