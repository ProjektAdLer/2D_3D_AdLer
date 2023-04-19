import LearningRoomAvailabilityStringParser from "../../BooleanAlgebra/BooleanAlgebraParser";
import {
  BooleanAndNode,
  BooleanOrNode,
  BooleanValueNode,
} from "../../BooleanAlgebra/BooleanSyntaxTree";

describe("BooleanAlgebraParser", () => {
  test("parses a simple expression into matching syntax tree", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("(1)^(2)v(3)");
    expect(result).toStrictEqual(
      new BooleanOrNode([
        new BooleanAndNode([
          new BooleanValueNode("1"),
          new BooleanValueNode("2"),
        ]),
        new BooleanValueNode("3"),
      ])
    );
  });

  test("parses a complex expression with brackets into matching syntax tree", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree(
        "((1)^(2)v(3))^(4)"
      );
    console.log(result);
    expect(result).toStrictEqual(
      new BooleanAndNode([
        new BooleanOrNode([
          new BooleanAndNode([
            new BooleanValueNode("1"),
            new BooleanValueNode("2"),
          ]),
          new BooleanValueNode("3"),
        ]),
        new BooleanValueNode("4"),
      ])
    );
  });

  test("parses a longer concatenation of ANDs into a single node", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("1^2^3^4^5");
    expect(result).toStrictEqual(
      new BooleanAndNode([
        new BooleanValueNode("1"),
        new BooleanValueNode("2"),
        new BooleanValueNode("3"),
        new BooleanValueNode("4"),
        new BooleanValueNode("5"),
      ])
    );
  });

  test("parses a longer concatenation of ORs into a single node", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("1v2v3v4v5");
    expect(result).toStrictEqual(
      new BooleanOrNode([
        new BooleanValueNode("1"),
        new BooleanValueNode("2"),
        new BooleanValueNode("3"),
        new BooleanValueNode("4"),
        new BooleanValueNode("5"),
      ])
    );
  });

  test("throws an error when the expression contains a invalid symbol", () => {
    expect(() =>
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("1v2v3v4v5:")
    ).toThrowError("Invalid expression");
  });
});
