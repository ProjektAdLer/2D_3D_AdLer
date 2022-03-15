import React, { useState } from "react";
import BabylonCanvas from "../BabylonCanvas/BabylonCanvas";
import H5PModal from "../LearningElementModal/H5PModal";
import "./App.css";
import { useInjection } from "inversify-react";
import REACT_TYPES from "../../DependencyInjection/ReactTypes";
import IEntityManager from "../../Entities/IEntityManager";

function App() {
  const [showH5P, setShowH5P] = useState(false);
  const [buttonTest, setButtonTest] = useState("Button");

  const entityManager: IEntityManager = useInjection(
    REACT_TYPES.IEntityManager
  );

  entityManager.setTestSubscription(setButtonTest);

  return (
    <React.Fragment>
      <div className="root">
        <div className="button-container">
          <button className="container-button" onClick={() => setShowH5P(true)}>
            {buttonTest}
          </button>
        </div>
        <BabylonCanvas />
        <H5PModal
          show={showH5P}
          onClose={() => setShowH5P(false)}
          h5pId={278}
          h5pFileName="Metriken Teil 1.h5p"
          title="Das Wasserfallmodell"
        />
      </div>
    </React.Fragment>
  );
}

export default App;
