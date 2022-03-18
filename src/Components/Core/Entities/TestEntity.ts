import Observable from "./API/Observable";

export default class TestEntity extends Observable<TestEntity> {
  public value1: Observable<boolean> = new Observable<boolean>(true);
  public value2: Observable<string> = new Observable<string>("false");
}
