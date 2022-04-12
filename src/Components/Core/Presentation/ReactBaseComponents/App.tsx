import React from "react";
import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import IEntityManager from "../../../Core/BusinessLogic/EntityManager/IEntityManager";
import { useInjection } from "inversify-react";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import usePrimitive from "../CustomHooks/usePrimitive";
import LearningElementModal from "../LearningElementModal/LearningElementModal";
import StyledButton from "../ReactCommon/StyledButton";

function App() {
  const entityManager = useInjection<IEntityManager>(CORE_TYPES.IEntityManager);

  const rootEntity = entityManager.getRootEntity();

  const [, setPrimitive] = usePrimitive(rootEntity.Value.memberx);
  const [, setShowModal] = usePrimitive(rootEntity.Value.showModal);

  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1 flex bg-babylonbg">
        <div className="button-container w-1/12 fixed h-fit top-0 left-0 flex flex-col gap-2 p-2 m-3 bg-adlergold rounded-lg">
          <StyledButton
            onClick={() => {
              setShowModal(true);

              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "H5P Öffnen"
          </StyledButton>
          <StyledButton
            onClick={() => {
              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "You were like a brother to me"
          </StyledButton>
          <StyledButton
            onClick={() => {
              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "Don't try it"
          </StyledButton>
          <StyledButton
            onClick={() => {
              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "I have the high ground, Anakin."
          </StyledButton>
        </div>
        <BabylonCanvas className="w-screen h-screen" />
        <LearningElementModal />
      </div>
    </React.Fragment>
  );
}

export default App;
