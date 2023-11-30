export default interface ILMSAdapter {
  onLoginSuccessful?(): void;
  onLogoutSuccessful?(): void;
}
