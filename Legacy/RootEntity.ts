import ObservablePrimitive from "../EntityManager/Observables/ObservablePrimitive";
import ObservableReadonlyID from "../EntityManager/Observables/ObservableReadonlyID";
import AbstractEntity from "./AbstractEntity";

export default class RootEntity extends AbstractEntity {
  testEntity = new ObservableReadonlyID();
  memberx = new ObservablePrimitive<string>("Das ist aus der eigenen Klasse");
  showModal = new ObservablePrimitive<boolean>(false);
  CurrentLearningElementId = new ObservablePrimitive<string>();
}
