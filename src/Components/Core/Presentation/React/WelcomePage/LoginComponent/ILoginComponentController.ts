export default interface ILoginComponentController {
  loginAsync(username: string, password: string): Promise<void>;
}
