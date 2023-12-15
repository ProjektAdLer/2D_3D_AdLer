import StateMachine from "../../../Core/Presentation/Utils/StateMachine/StateMachine";

enum MockActions {
  action,
}
enum MockStates {
  initialState,
  secondState,
}

describe("StateMachine", () => {
  let systemUnderTest: StateMachine<MockStates, MockActions>;

  test("CurrentState returns initial state after construction", () => {
    systemUnderTest = new StateMachine(MockStates.initialState, []);
    expect(systemUnderTest.CurrentState).toBe(MockStates.initialState);
  });

  test("applyAction returns false if no transition is found", () => {
    systemUnderTest = new StateMachine(MockStates.initialState, []);
    expect(systemUnderTest.applyAction(MockActions.action)).toBe(false);
  });

  test("applyAction returns true if transition is found", () => {
    systemUnderTest = new StateMachine(MockStates.initialState, [
      {
        action: MockActions.action,
        from: MockStates.initialState,
        to: MockStates.secondState,
      },
    ]);
    expect(systemUnderTest.applyAction(MockActions.action)).toBe(true);
  });

  test("CurrentState returns new state after transition", () => {
    systemUnderTest = new StateMachine(MockStates.initialState, [
      {
        action: MockActions.action,
        from: MockStates.initialState,
        to: MockStates.secondState,
      },
    ]);
    systemUnderTest.applyAction(MockActions.action);
    expect(systemUnderTest.CurrentState).toBe(MockStates.secondState);
  });

  test("applyAction calls onTransitionCallback if provided", () => {
    const mockCallback = jest.fn();
    systemUnderTest = new StateMachine(MockStates.initialState, [
      {
        action: MockActions.action,
        from: MockStates.initialState,
        to: MockStates.secondState,
        onTransitionCallback: mockCallback,
      },
    ]);
    systemUnderTest.applyAction(MockActions.action);
    expect(mockCallback).toBeCalledTimes(1);
  });
});
