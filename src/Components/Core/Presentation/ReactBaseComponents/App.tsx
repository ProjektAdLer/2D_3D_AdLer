import React from "react";
import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import IEntityManager from "../../../Core/BusinessLogic/EntityManager/IEntityManager";
import { useInjection } from "inversify-react";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import usePrimitive from "../CustomHooks/usePrimitive";
import LearningElementModal from "../LearningElementModal/LearningElementModal";
import StyledButton from "../ReactCommon/StyledButton";
import ButtonContainer from "../ReactCommon/ButtonContainer";
import LearningElementPanelContainer from "../LearningElementPanel/LearningElementPanelContainer";

function App() {
  const entityManager = useInjection<IEntityManager>(CORE_TYPES.IEntityManager);

  const rootEntity = entityManager.getRootEntity();

  const [, setPrimitive] = usePrimitive(rootEntity.Value.memberx);
  const [, setShowModal] = usePrimitive(rootEntity.Value.showModal);

  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1 flex bg-babylonbg">
        <LearningElementPanelContainer></LearningElementPanelContainer>
        <BabylonCanvas className="w-screen h-screen" />
        <LearningElementModal />
      </div>
    </React.Fragment>
  );
}

export default App;
