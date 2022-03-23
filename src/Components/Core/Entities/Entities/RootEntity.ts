import ObservablePrimitive from "../../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import ObservableReadonlyID from "../../BusinessLogic/EntityManager/Observables/ObservableReadonlyID";
import AbstractEntity from "../API/AbstractEntity";

export default class RootEntity extends AbstractEntity {
  testEntity = new ObservableReadonlyID();
  memberx = new ObservablePrimitive<string>("Das ist aus der eigenen Klasse");
  showModal = new ObservablePrimitive<boolean>(false);
}
