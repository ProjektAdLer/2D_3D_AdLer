import React, { useState } from "react";
import "./App.css";
import BabylonCanvas from "./Components/BabylonCanvas";
import H5PModal from "./Components/H5PModal";

function App() {
  const [showH5P, setShowH5P] = useState(false);
  return (
    <React.Fragment>
      <div>
        <button onClick={() => setShowH5P(true)}>Show H5P</button>
        <BabylonCanvas/>
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
