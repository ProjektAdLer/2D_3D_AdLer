import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import IStateMachine from "./IStateMachine";
import IStateTransition from "./IStateTransition";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

export default class StateMachine<STATE, ACTION>
  implements IStateMachine<STATE, ACTION>
{
  get CurrentState(): STATE {
    return this.currentState;
  }
  private currentState: STATE;
  private logger: ILoggerPort;

  constructor(
    initialState: STATE,
    private transitions: IStateTransition<STATE, ACTION>[],
  ) {
    this.currentState = initialState;
    this.logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
  }

  addTransition(transition: IStateTransition<STATE, ACTION>): void {
    this.transitions.push(transition);
  }

  applyAction(action: ACTION): boolean {
    const transition = this.transitions.find(
      (transition) =>
        transition.action === action && transition.from === this.currentState,
    );

    if (transition) {
      if (transition.onTransitionCallback) {
        transition.onTransitionCallback();
      }
      this.currentState = transition.to;
      return true;
    }

    this.logger.log(
      LogLevelTypes.WARN,
      "[StateMachine]: No transition found for action " +
        action +
        " in state " +
        this.currentState,
    );
    return false;
  }
}
