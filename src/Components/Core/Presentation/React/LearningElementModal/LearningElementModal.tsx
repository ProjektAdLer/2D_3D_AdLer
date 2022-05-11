import { useInjection } from "inversify-react";
import { useEffect } from "react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import EGenericLearningElement from "../../../Domain/Entities/LearningElements/GenericLearningElement";
import { LearningElementTypeSymbols } from "../../Babylon/LearningElement/Types/LearningElementTypes";
import useEntity from "../CustomHooks/useEntity";
import usePrimitive from "../CustomHooks/usePrimitive";
import H5PComponent from "./H5PComponent";
import IEntityManager from "../../../Domain/EntityManager/IEntityManager";
import StyledModal from "../ReactBaseComponents/StyledModal";
import ImageComponent from "./ImageComponent";
import VideoComponent from "./VideoComponent";
import TextComponent from "./TextComponent";

const elementBuilder = (learningElementID: string) => {
  const entityManager = CoreDIContainer.get(
    CORE_TYPES.IEntityManager
  ) as IEntityManager;

  const learningElementConainerEntity =
    entityManager.getEntityById<EGenericLearningElement>(
      learningElementID,
      EGenericLearningElement
    );
  const loremText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const { h5p, video, text, image } = LearningElementTypeSymbols;
  // TODO: Getting the LearningelementID for each type from Usecase ~FK
  switch (learningElementConainerEntity.Value.learningElementType.Value) {
    case h5p:
      return (
        <H5PComponent
          h5pEntityId={
            learningElementConainerEntity.Value.concreteLearningElementId.Value
          }
        />
      );
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
  const entityManager = useInjection<IEntityManager>(CORE_TYPES.IEntityManager);

  const rootEntity = entityManager.getRootEntity();
  const [showModal, setShowModal] = usePrimitive(rootEntity.Value.showModal);

  const [learningElementEntity] = useEntity<EGenericLearningElement>(
    rootEntity.Value.CurrentLearningElementId.Value,
    EGenericLearningElement
  );

  useEffect(() => {
    if (!showModal) return;
  }, [showModal]);

  if (!showModal) return null;

  return (
    <StyledModal
      onClose={() => setShowModal(false)}
      title={learningElementEntity.learningElementTitle.Value}
      showModal={showModal}
      footer="Ich bin der Fußteil"
    >
      {elementBuilder(learningElementEntity.id)}
    </StyledModal>
  );
}
