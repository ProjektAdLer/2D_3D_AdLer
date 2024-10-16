export default interface IBreakTimeNotification {
  titleKey: string; // key reference string inside localize language package
  titleMessageKeys: string[]; // keys reference strings inside localize language package
  images: string[];
  seenBefore: boolean;
}
