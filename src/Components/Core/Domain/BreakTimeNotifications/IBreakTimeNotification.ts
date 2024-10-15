export default interface IBreakTimeNotification {
  titleKey: string; // key reference string inside localize language package
  titleMessageKeys: string[]; // keys reference strings inside localize language package
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  seenBefore: boolean;
}
