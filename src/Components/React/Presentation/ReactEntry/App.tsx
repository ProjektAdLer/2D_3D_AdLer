import React, { useState } from "react";
import BabylonCanvas from "../BabylonCanvas/BabylonCanvas";
import H5PModal from "../LearningElementModal/H5PModal";
import "./App.css";
import useEntityManager from "../../CustomHooks/useEntityManager";

function App() {
  const [showH5P, setShowH5P] = useEntityManager();

  return (
    <React.Fragment>
      <div className="root">
        <div className="button-container">
          <button className="container-button" onClick={() => setShowH5P(true)}>
            "H5P Öffnen"
          </button>
        </div>
        <BabylonCanvas />
        <H5PModal
          show={showH5P}
          onClose={() => setShowH5P(false)}
          h5pId={278}
          h5pFileName="Metriken Teil 1.h5p"
          title={"Das Wasserfallmodell"}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
