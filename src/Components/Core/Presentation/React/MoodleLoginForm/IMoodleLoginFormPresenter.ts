export default interface IMoodleLoginFormPresenter {
  displayLoginForm(): void;
  loginSuccessful(): void;
  debug_DisplayUserToken(userToken: string): void;
}
