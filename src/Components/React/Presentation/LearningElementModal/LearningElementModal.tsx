import { useInjection } from "inversify-react";
import { useEffect } from "react";
import IEntityManager from "../../../Core/BusinessLogic/EntityManager/IEntityManager";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import EGenericLearningElement from "../../../Core/Entities/Entities/LearningElements/GenericLearningElement";
import useEntity from "../../CustomHooks/useEntity";
import usePrimitive from "../../CustomHooks/usePrimitive";
import H5PModal from "./H5PModal";

// const elementBuilder = (entityId: string) => {
//   const entityManager = CoreDIContainer.get<INewEntityManager>(
//     CORE_TYPES.INewEntityManager
//   );

//   const rootEntity = entityManager.getRootEntity();
//   switch (rootEntity.Value.OpenLearningElement.Value) {
//     case "H5P":
//       return <H5PModal h5pId={0} h5pFileName={""} />;
//     default:
//       return <div>No Learning Element selected</div>;
//   }
// };

export default function LearningElementModal() {
  const entityManager = useInjection<IEntityManager>(
    CORE_TYPES.INewEntityManager
  );

  const rootEntity = entityManager.getRootEntity();
  const [showModal, setShowModal] = usePrimitive(rootEntity.Value.showModal);

  const [learningElementEntity] = useEntity<EGenericLearningElement>(
    rootEntity.Value.CurrentLearningElementId.Value,
    EGenericLearningElement
  );

  console.log(learningElementEntity);

  //const [modalTitle] = usePrimitive(rootEntity.Value.Hh5PTitle);

  useEffect(() => {
    if (!showModal) return;
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="modal flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-blacktrans50">
      <div className="modal-content bg-white w-2/3 border-8 border-blue-200 rounded-lg">
        <div className="modal-header flex justify-between items-center p-2 h-16 text-xl">
          {learningElementEntity.learningElementTitle}
          <button
            onClick={() => setShowModal(false)}
            className="button-close m-2 p-2"
          >
            X
          </button>
        </div>
        <div className="modal-body p-2 border-t-2 border-b-2 border-blue-200">
          {/* {elementBuilder("")} */}
          <H5PModal h5pFileName="" h5pId={123} />
        </div>
        <div className="modal-footer flex justify-between items-center p-2 h-16">
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
