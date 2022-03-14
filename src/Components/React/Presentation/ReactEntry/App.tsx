import React, { useState } from "react";
import BabylonCanvas from "../BabylonCanvas/BabylonCanvas";
import H5PModal from "../LearningElementModal/H5PModal";
import "./App.css";

function App() {
  const [showH5P, setShowH5P] = useState(false);
  return (
    <React.Fragment>
      <div className="root">
        <section>
          <button onClick={() => setShowH5P(true)}>Show H5P</button>
        </section>
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
