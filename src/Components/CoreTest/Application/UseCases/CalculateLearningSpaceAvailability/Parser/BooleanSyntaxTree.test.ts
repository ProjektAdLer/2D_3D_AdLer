import {
  BooleanAndNode,
  BooleanIDNode,
  BooleanOrNode,
} from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";

describe("BooleanSyntaxTree", () => {
  test("BooleanIDNode Value getter returns the value it was constructed with", () => {
    const systemUnderTest = new BooleanIDNode(1);
    expect(systemUnderTest.Value).toBe(1);
  });

  test("BooleanIDNode evaluates to true according to the evalutation map", () => {
    const systemUnderTest = new BooleanIDNode(1);
    const evaluationMap = new Map<number, boolean>();
    evaluationMap.set(1, true);
    expect(systemUnderTest.evaluate(evaluationMap)).toBe(true);
  });

  test("BooleanIDNode evaluates to false according to the evalutation map", () => {
    const systemUnderTest = new BooleanIDNode(1);
    const evaluationMap = new Map<number, boolean>();
    evaluationMap.set(1, false);
    expect(systemUnderTest.evaluate(evaluationMap)).toBe(false);
  });

  test("BooleanIDNode evaluates to false when its id isn't in the evaluation map", () => {
    const systemUnderTest = new BooleanIDNode(1);
    const evaluationMap = new Map<number, boolean>();
    expect(systemUnderTest.evaluate(evaluationMap)).toBe(false);
  });

  test("BooleanAndNode evaluates to true when all its children evaluate to true", () => {
    const systemUnderTest = new BooleanAndNode([
      new BooleanIDNode(1),
      new BooleanIDNode(2),
      new BooleanIDNode(3),
    ]);
    const evaluationMap = new Map<number, boolean>();
    evaluationMap.set(1, true);
    evaluationMap.set(2, true);
    evaluationMap.set(3, true);
    expect(systemUnderTest.evaluate(evaluationMap)).toBe(true);
  });

  test("BooleanAndNode evaluates to false when one of its children evaluate to false", () => {
    const systemUnderTest = new BooleanAndNode([
      new BooleanIDNode(1),
      new BooleanIDNode(2),
      new BooleanIDNode(3),
    ]);
    const evaluationMap = new Map<number, boolean>();
    evaluationMap.set(1, true);
    evaluationMap.set(2, false);
    evaluationMap.set(3, true);
    expect(systemUnderTest.evaluate(evaluationMap)).toBe(false);
  });

  test("BooleanOrNode evaluates to true when one of its children evaluate to true", () => {
    const systemUnderTest = new BooleanOrNode([
      new BooleanIDNode(1),
      new BooleanIDNode(2),
      new BooleanIDNode(3),
    ]);
    const evaluationMap = new Map<number, boolean>();
    evaluationMap.set(1, false);
    evaluationMap.set(2, false);
    evaluationMap.set(3, true);
    expect(systemUnderTest.evaluate(evaluationMap)).toBe(true);
  });

  test("BooleanOrNode evaluates to false when all of its children evaluate to false", () => {
    const systemUnderTest = new BooleanOrNode([
      new BooleanIDNode(1),
      new BooleanIDNode(2),
      new BooleanIDNode(3),
    ]);
    const evaluationMap = new Map<number, boolean>();
    evaluationMap.set(1, false);
    evaluationMap.set(2, false);
    evaluationMap.set(3, false);
    expect(systemUnderTest.evaluate(evaluationMap)).toBe(false);
  });
});
