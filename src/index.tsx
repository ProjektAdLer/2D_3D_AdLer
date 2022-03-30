import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import IEntityManager from "./Components/Core/BusinessLogic/EntityManager/IEntityManager";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import EGenericLearningElement from "./Components/Core/Entities/Entities/LearningElements/GenericLearningElement";
import RootEntity from "./Components/Core/Entities/Entities/RootEntity";
import EH5PLearningElement from "./Components/Core/Entities/Entities/LearningElements/H5PLearningElement";
import { LearningElementTypeSymbols } from "./Components/Core/Presentation/LearningElement/Types/LearningElementTypes";
import ICore from "./Components/Core/API/ICore";

const Core = CoreDIContainer.get<ICore>(CORE_TYPES.ICore);
const entityManager = CoreDIContainer.get<IEntityManager>(
  CORE_TYPES.IEntityManager
);

const genenericLearningElementId = entityManager.createEntity<
  EGenericLearningElement,
  RootEntity
>(
  {
    learningElementTitle: "Titel aus index.ts",
    learningElementType: LearningElementTypeSymbols.h5p,
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

Core.setupReact();
