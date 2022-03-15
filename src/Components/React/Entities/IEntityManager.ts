export default interface IEntityManager {
  setData(data: string): void;
  setTestSubscription(fn: (data: string) => void): void;
}
