import {
  BooleanAndNode,
  BooleanIDNode,
  BooleanNode,
  BooleanOrNode,
} from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";
import { validate as uuidValidate } from "uuid";
import BooleanSyntaxTreeBreadthFirstTraversalIterator from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTreeBreadthFirstTraversalIterator";

describe("BooleanSyntaxTree", () => {
  describe("abstract BooleanNode", () => {
    test("breadthFirstTraversal method returns an iterator object", () => {
      const systemUnderTest = new BooleanAndNode([
        new BooleanIDNode(1),
        new BooleanIDNode(2),
      ]);
      expect(systemUnderTest.breadthFirstTraversal()).toBeInstanceOf(
        BooleanSyntaxTreeBreadthFirstTraversalIterator
      );
    });

    test("can be iterated with a for..of loop", () => {
      const systemUnderTest = new BooleanAndNode([
        new BooleanIDNode(1),
        new BooleanIDNode(2),
      ]);
      for (const node of systemUnderTest) {
        expect(node).toMatchObject({
          node: expect.any(BooleanNode),
          parentNodeID: expect.any(String),
        });
      }
    });
  });

  describe("abstract BooleanNaryNode", () => {
    test("BooleanNaryNode containsID method returns true if expressions contain a BooleanIDNode with given value", () => {
      const systemUnderTest = new BooleanAndNode([
        new BooleanIDNode(1),
        new BooleanIDNode(2),
      ]);
      expect(systemUnderTest.containsID(1)).toBe(true);
    });

    test("BooleanNaryNode containsID method returns false if expressions do not contain a BooleanIDNode with given value", () => {
      const systemUnderTest = new BooleanOrNode([
        new BooleanIDNode(1),
        new BooleanIDNode(2),
      ]);
      expect(systemUnderTest.containsID(3)).toBe(false);
    });
  });

  describe("BooleanIDNode", () => {
    test("BooleanIDNode Type getter returns 'ID'", () => {
      const systemUnderTest = new BooleanIDNode(1);
      expect(systemUnderTest.Type).toBe("ID");
    });

    test("BooleanIDNode Value getter returns the value it was constructed with", () => {
      const systemUnderTest = new BooleanIDNode(1);
      expect(systemUnderTest.Value).toBe(1);
    });

    test("BooleanIDNode ID getter returns its stringified value", () => {
      const systemUnderTest = new BooleanIDNode(1);
      expect(systemUnderTest.ID).toBe("1");
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

    test("BooleanIDNode toString method returns a correct string representation", () => {
      const systemUnderTest = new BooleanIDNode(1);
      expect(systemUnderTest.toString()).toBe("(1)");
    });
  });

  describe("BooleanAndNode", () => {
    test("BooleanAndNode Type getter returns 'AND'", () => {
      const systemUnderTest = new BooleanAndNode([]);
      expect(systemUnderTest.Type).toBe("AND");
    });

    test("BooleanAndNode ID getter returns a valid uuid", () => {
      const systemUnderTest = new BooleanAndNode([]);
      expect(uuidValidate(systemUnderTest.ID)).toBe(true);
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

    test("BooleanAndNode toString method returns a correct string representation", () => {
      const systemUnderTest = new BooleanAndNode([
        new BooleanIDNode(1),
        new BooleanIDNode(2),
        new BooleanIDNode(3),
      ]);
      expect(systemUnderTest.toString()).toBe("((1) ^ (2) ^ (3))");
    });
  });

  describe("BooleanOrNode", () => {
    test("BooleanOrNode Type getter returns 'OR'", () => {
      const systemUnderTest = new BooleanOrNode([]);
      expect(systemUnderTest.Type).toBe("OR");
    });

    test("BooleanOrNode ID getter returns a valid uuid", () => {
      const systemUnderTest = new BooleanOrNode([]);
      expect(uuidValidate(systemUnderTest.ID)).toBe(true);
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

    test("BooleanOrNode toString method returns a correct string representation", () => {
      const systemUnderTest = new BooleanOrNode([
        new BooleanIDNode(1),
        new BooleanIDNode(2),
        new BooleanIDNode(3),
      ]);
      expect(systemUnderTest.toString()).toBe("((1) v (2) v (3))");
    });
  });
});
