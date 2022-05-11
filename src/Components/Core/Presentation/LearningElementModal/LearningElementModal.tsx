import { useInjection } from "inversify-react";
import { useEffect, useRef } from "react";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import EGenericLearningElement from "../../Domain/Entities/LearningElements/GenericLearningElement";
import { LearningElementTypeSymbols } from "../../../Core/Presentation/LearningElement/Types/LearningElementTypes";
import useEntity from "../CustomHooks/useEntity";
import usePrimitive from "../CustomHooks/usePrimitive";
import H5PContent from "./H5PContent";
import VideoPlayer from "./VideoPlayer";
import IEntityManager from "../../Domain/EntityManager/IEntityManager";
import StyledModal from "../ReactBaseComponents/StyledModal";

import useVideoPlayer from "../CustomHooks/useVideoPlayer";

const elementBuilder = (learningElementID: string) => {
  const entityManager = CoreDIContainer.get(
    CORE_TYPES.IEntityManager
  ) as IEntityManager;

  const learningElementConainerEntity =
    entityManager.getEntityById<EGenericLearningElement>(
      learningElementID,
      EGenericLearningElement
    );

  const { h5p, text, image, video } = LearningElementTypeSymbols;
  //switch (learningElementConainerEntity.Value.learningElementType.Value) {
  switch (video) {
    case h5p:
      return (
        <H5PContent
          h5pEntityId={
            learningElementConainerEntity.Value.concreteLearningElementId.Value
          }
        />
      );
    case video:
      return <VideoPlayer videosrc={"../../../../Assets/testVideoEagle.mp4"} />;
    case text:
      return <div>Text TBI</div>;
    case image:
      return <div>Image TBI</div>;
    default:
      return <div>Learning Element type missing!</div>;
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
