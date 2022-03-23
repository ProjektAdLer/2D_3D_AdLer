import ObservablePrimitive from "../../../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import AbstractEntity from "../../API/AbstractEntity";

export default class H5PElement extends AbstractEntity {
  h5pContextId = new ObservablePrimitive<number>();
  h5pFileName = new ObservablePrimitive<string>();
  h5pTitle = new ObservablePrimitive<string>("Testtitel aus dem Entity");
}
