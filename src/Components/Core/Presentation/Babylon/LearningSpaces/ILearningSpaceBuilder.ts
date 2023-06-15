import LearningSpaceTO from "../../../Application/DataTransferObjects/LearningSpaceTO";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";

export default interface ILearningSpaceBuilder
  extends IAsyncPresentationBuilder {
  spaceData: LearningSpaceTO;
}
