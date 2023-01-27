export default interface ILoginButtonController {
  loginAsync(username: string, password: string): Promise<void>;
}
