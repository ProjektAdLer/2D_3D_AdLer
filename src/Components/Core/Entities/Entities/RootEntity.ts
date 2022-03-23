import ObservableReadonlyID from "../../BusinessLogic/EntityManager/Observables/ObservableReadonlyID";
import AbstractEntity from "../API/AbstractEntity";

export default class RootEntity extends AbstractEntity {
  testEntity = new ObservableReadonlyID();
}
