import { useInjection } from "inversify-react";
import { useEffect } from "react";
import IEntityManager from "../../../Core/BusinessLogic/EntityManager/IEntityManager";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import EGenericLearningElement from "../../../Core/Entities/Entities/LearningElements/GenericLearningElement";
import { LearningElementTypeSymbols } from "../../../Core/Presentation/LearningElement/Types/LearningElementTypes";
import useEntity from "../CustomHooks/useEntity";
import usePrimitive from "../CustomHooks/usePrimitive";
import H5PModal from "./H5PModal";

const elementBuilder = (learningElementID: string) => {
  const entityManager = CoreDIContainer.get(
    CORE_TYPES.IEntityManager
  ) as IEntityManager;

  const learningElementConainerEntity =
    entityManager.getEntityById<EGenericLearningElement>(
      learningElementID,
      EGenericLearningElement
    );

  const { h5p } = LearningElementTypeSymbols;

  switch (learningElementConainerEntity.Value.learningElementType.Value) {
    case h5p:
      return (
        <H5PModal
          h5pEntityId={
            learningElementConainerEntity.Value.concreteLearningElementId.Value
          }
        />
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
    <div className="modal flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-blacktrans50">
      <div className="modal-content bg-adlerlightblue w-full lg:w-5/6 max-h-screen border-8 border-adlerlightblue rounded-lg overflow-auto">
        <div className="modal-header font-black flex justify-between items-center p-4 h-6 lg:h-16 text-xl lg:text-2xl">
          {learningElementEntity.learningElementTitle.Value}
          <button
            onClick={() => setShowModal(false)}
            className="button-close font-black text-xs lg:text-xl drop-shadow-sm border-b-4 border-r-4 border-adlerdarkblue active:border-0 hover:cursor-pointer py-1 px-2 bg-adlerblue rounded-lg text-white"
          >
            X
          </button>
        </div>
        <div className="modal-body flex justify-center p-2 border-t-2 border-b-2 rounded-lg border-adlerlightblue">
          {elementBuilder(learningElementEntity.id)}
        </div>
        <div className="modal-footer font-medium flex shrink justify-between items-center p-2 h-16">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
        </div>
      </div>
    </div>
  );
}
