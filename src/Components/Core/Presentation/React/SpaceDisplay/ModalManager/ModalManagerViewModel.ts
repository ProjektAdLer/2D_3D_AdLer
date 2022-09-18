import { ErrorMessage } from "./ModalManagerPresenter";
import Observable from "../../../../../../Lib/Observable";

export default class ModalManagerViewModel {
  errors = new Observable<ErrorMessage[]>([], true);
}
