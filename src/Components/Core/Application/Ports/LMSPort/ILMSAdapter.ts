export default interface ILMSAdapter {
  onLoginSuccessful?(userName: string): void;
  onLogoutSuccessful?(): void;
}
