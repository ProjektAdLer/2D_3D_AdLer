import IStateTransition from "./IStateTransition";

export default interface IStateMachine<STATE, ACTION> {
  readonly CurrentState: STATE;
  applyAction(action: ACTION): boolean;
  addTransition(transition: IStateTransition<STATE, ACTION>): void;
}
