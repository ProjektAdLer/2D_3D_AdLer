export default interface IStateMachine<STATE, ACTION> {
  readonly CurrentState: STATE;
  applyAction(action: ACTION): boolean;
}
