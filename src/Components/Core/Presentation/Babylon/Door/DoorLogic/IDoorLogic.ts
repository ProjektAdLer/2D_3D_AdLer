export default interface IDoorLogic {
  open(): void;
  avatarClose?(): void;
  avatarFar?(): void;
  // ggf. weitere Methoden, die beide Logiken benötigen
}
