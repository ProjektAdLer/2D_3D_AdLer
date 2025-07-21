export default interface IDoorLogic {
  open(onAnimationEnd?: () => void): void;
  close?(): void;
  avatarClose?(): void;
  avatarFar?(): void;
  // ggf. weitere Methoden, die beide Logiken benötigen
}
