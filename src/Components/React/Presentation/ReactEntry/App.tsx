import React, { useState } from "react";
import BabylonCanvas from "../BabylonCanvas/BabylonCanvas";
import "./App.css";
import INewEntityManager from "../../../Core/BusinessLogic/EntityManager/NewEntityManager/INewEntityManager";
import { useInjection } from "inversify-react";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import usePrimitive from "../../CustomHooks/usePrimitive";
import LearningElementModal from "../LearningElementModal/LearningElementModal";
import LearningElement from "../../../Core/Entities/Entities/LearningElements/LearningElement";
import H5PElement from "../../../Core/Entities/Entities/LearningElements/H5PElement";
import RootEntity from "../../../Core/Entities/Entities/RootEntity";

function App() {
  const entityManager = useInjection<INewEntityManager>(
    CORE_TYPES.INewEntityManager
  );

  const [modalOpen, setModalOpen] = useState(false);

  const rootEntity = entityManager.getRootEntity();

  const [, setPrimitive] = usePrimitive(rootEntity.Value.memberx);
  const [showModal, setShowModal] = usePrimitive(rootEntity.Value.showModal);

  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1">
        <div className="button-container fixed top-0 left-0 flex-col gap-4 m-5 w-120px max-h-full bg-white rounded-lg">
          <button
            className="container-button w-24 h-6 m-3 hover:cursor-pointer"
            onClick={() => {
              const learningElementID = entityManager.createEntity<
                LearningElement,
                RootEntity
              >(
                {
                  type: "H5P",
                  name: "H5P aus createEntity",
                },
                rootEntity.Value.id,
                "OpenLearningElement",
                LearningElement
              );

              const concreteLearningElementId = entityManager.createEntity<
                H5PElement,
                LearningElement
              >(
                {
                  h5pContextId: 278,
                  h5pFileName: "Metriken Teil 1.h5p",
                  h5pTitle: "H5P aus createEntity",
                },
                learningElementID,
                "concreteLearningElementId",
                H5PElement
              );

              setShowModal(true);

              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "H5P Öffnen"
          </button>
        </div>
        <BabylonCanvas className="w-screen h-screen" />
        {showModal && <LearningElementModal />}
      </div>
    </React.Fragment>
  );
}

export default App;
