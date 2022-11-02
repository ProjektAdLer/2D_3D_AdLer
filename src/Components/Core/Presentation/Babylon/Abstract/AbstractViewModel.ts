import bind from "bind-decorator";

export default abstract class AbstractViewModel {
  public isDirty: boolean = false;

  // bind decorator to make it usable as callback
  @bind
  protected setIsDirtyTrue() {
    this.isDirty = true;
  }
}
