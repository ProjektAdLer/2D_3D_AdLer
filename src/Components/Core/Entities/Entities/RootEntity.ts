import ObservablePrimitive from "../../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import ObservableReadonlyID from "../../BusinessLogic/EntityManager/Observables/ObservableReadonlyID";
import AbstractEntity from "../API/AbstractEntity";

export default class RootEntity extends AbstractEntity {
  testEntity = new ObservableReadonlyID();
  memberx = new ObservablePrimitive<string>("Das ist aus der eigenen Klasse");
  showModal = new ObservablePrimitive<boolean>(false);
  //Hh5PTitle = new ObservablePrimitive<string>("TestTitel für H5P");

  //OpenLearningElement = new ObservablePrimitive<string>("H5P");
  /**
   * EGenericLearningElement
   */
  CurrentLearningElementId = new ObservablePrimitive<string>();
}
