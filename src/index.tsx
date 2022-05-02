import "reflect-metadata";
import CoreDIContainer from "./Components/Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "./Components/Core/DependencyInjection/CoreTypes";
import EGenericLearningElement from "./Components/Core/Domain/Entities/LearningElements/GenericLearningElement";
import RootEntity from "./Components/Core/Domain/Entities/RootEntity";
import EH5PLearningElement from "./Components/Core/Domain/Entities/LearningElements/H5PLearningElement";
import { LearningElementTypeSymbols } from "./Components/Core/Presentation/LearningElement/Types/LearningElementTypes";
import ICore from "./Components/Core/API/ICore";
import IEntityManager from "./Components/Core/Domain/EntityManager/NewEntityManager/IEntityManager";
import {
  newTestEntity,
  newTestEntity2,
} from "./Components/Core/Domain/EntityManager/NewEntityManager/newTestEntity";

const Core = CoreDIContainer.get<ICore>(CORE_TYPES.ICore);
// const entityManager = CoreDIContainer.get<IEntityManager>(
//   CORE_TYPES.IEntityManager
// );

// const genenericLearningElementId = entityManager.createEntity<
//   EGenericLearningElement,
//   RootEntity
// >(
//   {
//     learningElementTitle: "Titel aus index.ts",
//     learningElementType: LearningElementTypeSymbols.h5p,
//   },
//   entityManager.getRootEntity().Value.id,
//   "CurrentLearningElementId",
//   EGenericLearningElement
// );

// const concreteLearningElementId = entityManager.createEntity<
//   EH5PLearningElement,
//   EGenericLearningElement
// >(
//   {
//     h5PcontextId: 278,
//     h5PFileName: "Metriken Teil 1.h5p",
//   },
//   genenericLearningElementId,
//   "concreteLearningElementId",
//   EH5PLearningElement
// );

const NewEntityManager = CoreDIContainer.get<IEntityManager>(
  CORE_TYPES.INewEntityManager
);
NewEntityManager.createEntity<newTestEntity>(
  {
    test1: "test1",
    test2: true,
  },
  newTestEntity
);
NewEntityManager.createEntity<newTestEntity>({}, newTestEntity);
NewEntityManager.createEntity<newTestEntity2>(
  {
    test3: 1337,
  },
  newTestEntity2
);

Core.setupReact();
