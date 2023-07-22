export interface IStateTransition<STATE, ACTION> {
  action: ACTION;
  from: STATE;
  to: STATE;
  onTransitionCallback?: () => void;
}

export interface IStateMachine<STATE, ACTION> {
  readonly CurrentState: STATE;
  applyAction(action: ACTION): boolean;
}

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
