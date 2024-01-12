import IStateMachine from "./IStateMachine";
import IStateTransition from "./IStateTransition";

export default class StateMachine<STATE, ACTION>
  implements IStateMachine<STATE, ACTION>
{
  get CurrentState(): STATE {
    return this.currentState;
  }
  private currentState: STATE;

  constructor(
    initialState: STATE,
    private transitions: IStateTransition<STATE, ACTION>[]
  ) {
    this.currentState = initialState;
  }

  addTransition(transition: IStateTransition<STATE, ACTION>): void {
    this.transitions.push(transition);
  }

  applyAction(action: ACTION): boolean {
    const transition = this.transitions.find(
      (transition) =>
        transition.action === action && transition.from === this.currentState
    );

    if (transition) {
      if (transition.onTransitionCallback) {
        transition.onTransitionCallback();
      }
      this.currentState = transition.to;
      return true;
    }

    return false;
  }
}
