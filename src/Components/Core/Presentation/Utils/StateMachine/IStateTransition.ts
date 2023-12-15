export default interface IStateTransition<STATE, ACTION> {
  action: ACTION;
  from: STATE;
  to: STATE;
  onTransitionCallback?: () => void;
}
