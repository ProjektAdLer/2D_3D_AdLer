import React from "react";
import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import IEntityManager from "../../../Core/BusinessLogic/EntityManager/IEntityManager";
import { useInjection } from "inversify-react";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import usePrimitive from "../CustomHooks/usePrimitive";
import LearningElementModal from "../LearningElementModal/LearningElementModal";

function App() {
  const entityManager = useInjection<IEntityManager>(CORE_TYPES.IEntityManager);

  const rootEntity = entityManager.getRootEntity();

  const [, setPrimitive] = usePrimitive(rootEntity.Value.memberx);
  const [, setShowModal] = usePrimitive(rootEntity.Value.showModal);

  return (
    <React.Fragment>
      <div className="root max-w-1/1 max-h-1/1 flex bg-babylonbg">
        <div className="button-container w-1/12 fixed h-fit top-0 left-0 flex flex-col gap-2 p-2 m-3 bg-adlergold rounded-lg">
          <button
            className="container-button w-3/4 hover:cursor-pointer text-sm lg:text-xl border-b-4 border-r-4 border-adlerdarkblue active:border-0 m-auto py-1 px-2 bg-adlerblue rounded-lg font-black text-white"
            onClick={() => {
              setShowModal(true);

              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "H5P Öffnen"
          </button>
          <button
            className="container-button w-3/4 hover:cursor-pointer text-sm lg:text-xl border-b-4 border-r-4 border-adlerdarkblue active:border-0 m-auto py-1 px-2 bg-adlerblue rounded-lg font-black text-white"
            onClick={() => {
              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "You were like a brother to me"
          </button>
          <button
            className="container-button w-3/4 hover:cursor-pointer text-sm lg:text-xl border-b-4 border-r-4 border-adlerdarkblue active:border-0 m-auto py-1 px-2 bg-adlerblue rounded-lg font-black text-white"
            onClick={() => {
              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "Don't try it"
          </button>
          <button
            className="container-button w-3/4 hover:cursor-pointer text-sm lg:text-xl border-b-4 border-r-4 border-adlerdarkblue active:border-0 m-auto py-1 px-2 bg-adlerblue rounded-lg font-black text-white"
            onClick={() => {
              setPrimitive("Das ist ein Test aus dem Knopf heraus ;) ");
            }}
          >
            "I have the high ground, Anakin."
          </button>
        </div>
        <BabylonCanvas className="w-screen h-screen" />
        <LearningElementModal />
      </div>
    </React.Fragment>
  );
}

export default App;
