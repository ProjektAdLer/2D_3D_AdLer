import IAsyncPresentationBuilder from "./IAsyncPresentationBuilder";
import PresentationBuilder from "./PresentationBuilder";

export default abstract class AsyncPresentationBuilder<VM, C, V, P>
  extends PresentationBuilder<VM, C, V, P>
  implements IAsyncPresentationBuilder
{
  isCompleted: Promise<void>;

  protected resolveIsCompleted: (value: void | PromiseLike<void>) => void;
}
