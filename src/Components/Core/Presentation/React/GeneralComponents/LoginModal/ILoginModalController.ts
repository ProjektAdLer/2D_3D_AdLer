export default interface ILoginModalController {
  loginAsync(username: string, password: string): Promise<void>;
}
