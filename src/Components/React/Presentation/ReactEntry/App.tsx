import React from "react";
import BabylonCanvas from "../BabylonCanvas/BabylonCanvas";
import "./App.css";
import IEntityManager from "../../../Core/BusinessLogic/EntityManager/INewEntityManager";
import { useInjection } from "inversify-react";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import usePrimitive from "../../CustomHooks/usePrimitive";
import LearningElementModal from "../LearningElementModal/LearningElementModal";

function App() {
  const entityManager = useInjection<IEntityManager>(
    CORE_TYPES.INewEntityManager
  );

  const rootEntity = entityManager.getRootEntity();

  const [, setPrimitive] = usePrimitive(rootEntity.Value.memberx);
  const [, setShowModal] = usePrimitive(rootEntity.Value.showModal);

  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1">
        <div className="button-container fixed top-0 left-0 flex-col gap-4 m-5 w-120px max-h-full bg-white rounded-lg">
          <button
            className="container-button w-24 h-6 m-3 hover:cursor-pointer"
            onClick={() => {
              setShowModal(true);

              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "H5P Öffnen"
          </button>
        </div>
        <BabylonCanvas className="w-screen h-screen" />
        <LearningElementModal />
      </div>
    </React.Fragment>
  );
}

export default App;
