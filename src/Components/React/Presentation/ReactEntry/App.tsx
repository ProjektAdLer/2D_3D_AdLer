import React, { useState } from "react";
import BabylonCanvas from "../BabylonCanvas/BabylonCanvas";
import H5PModal from "../LearningElementModal/H5PModal";
import "./App.css";
import useEntityManager from "../../CustomHooks/useEntityManager";
import INewEntityManager from "../../../Core/BusinessLogic/EntityManager/NewEntityManager/INewEntityManager";
import { useInjection } from "inversify-react";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import usePrimitive from "../../CustomHooks/usePrimitive";

function App() {
  const entityManager = useInjection<INewEntityManager>(
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
              //setShowH5P(true);
              setShowModal(true);

              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "H5P Öffnen"
          </button>
        </div>
        <BabylonCanvas className="w-screen h-screen" />
        <H5PModal
          //show={showH5P}
          onClose={() => setShowModal(false)}
          h5pId={278}
          h5pFileName="Metriken Teil 1.h5p"
          title={"Das Wasserfallmodell"}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
