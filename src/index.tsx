import "reflect-metadata";
import IReactApi from "./Components/React/API/IReactAPI";
import REACT_TYPES from "./Components/React/DependencyInjection/ReactTypes";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import IEntityManager from "./Components/Core/BusinessLogic/EntityManager/IEntityManager";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import EGenericLearningElement from "./Components/Core/Entities/Entities/LearningElements/GenericLearningElement";
import RootEntity from "./Components/Core/Entities/Entities/RootEntity";
import EH5PLearningElement from "./Components/Core/Entities/Entities/LearningElements/H5PLearningElement";

const ReactCore = CoreDIContainer.get<IReactApi>(REACT_TYPES.IReactApi);
const entityManager = CoreDIContainer.get<IEntityManager>(
  CORE_TYPES.IEntityManager
);

const genenericLearningElementId = entityManager.createEntity<
  EGenericLearningElement,
  RootEntity
>(
  {
    learningElementTitle: "Titel aus index.ts",
    learningElementType: "H5P",
  },
  entityManager.getRootEntity().Value.id,
  "CurrentLearningElementId",
  EGenericLearningElement
);

const concreteLearningElementId = entityManager.createEntity<
  EH5PLearningElement,
  EGenericLearningElement
>(
  {
    h5PcontextId: 278,
    h5PFileName: "Metriken Teil 1.h5p",
  },
  genenericLearningElementId,
  "concreteLearningElementId",
  EH5PLearningElement
);

ReactCore.initReact();
