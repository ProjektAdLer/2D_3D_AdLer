import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import { LearningElementTypeSymbols } from "../../Babylon/LearningElement/Types/LearningElementTypes";
import H5PComponent from "./H5PComponent";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";
import TextComponent from "./TextComponent";
import LearningElementEntity from "../../../Domain/Entities/LearningElementEntity";

const elementBuilder = (learningElementID: string) => {
  const loremText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const { h5p, video, text, image } = LearningElementTypeSymbols;
  // TODO: Getting the LearningelementID for each type from Usecase ~FK
  //switch (learningElementConainerEntity.Value.learningElementType.Value) {
  switch (h5p) {
    case h5p:
      return <H5PComponent h5pEntityId={"0"} />;
    case text:
      return <TextComponent textContent={loremText} />;
    case video:
      return <VideoComponent embedId="iik25wqIuFo" />;
    case image:
      return (
        <div className="h-100 w-100">
          <ImageComponent
            imagesrc={
              "https://cdn.discordapp.com/attachments/887582352560246804/949558830486929458/Doku_Raumaufbau.png"
            }
          />
        </div>
      );
    default:
      return <div>No Learning Element selected</div>;
  }
};

export default function LearningElementModal() {
  //   const entityManager = useInjection<IEntityManager>(CORE_TYPES.IEntityManager);
  //   // Waiting for the ViewModel to be implemented ~FK
  //  const [showModal, setShowModal] = usePrimitive(LearningElementEntity.showModal);
  //   const [learningElementEntity] = useEntity<LearningElementEntity>(
  //     LearningElementEntity.LearningElementId.Value,
  //     LearningElementEntity
  //   );
  //   useEffect(() => {
  //     if (!showModal) return;
  //   }, [showModal]);
  //   if (!showModal) return null;
  //   return (
  //     <StyledModal
  //       //onClose={() => setShowModal(false)}
  //       //title={learningElementEntity.learningElementTitle.Value}
  //       showModal={false}
  //       footer="Ich bin der Fußteil"
  //     >
  //       {elementBuilder(learningElementEntity.id)}
  //     </StyledModal>
  //   );
}
