import LearningRoomAvailabilityStringParser from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/LearningRoomAvailabilityStringParser";
import {
  BooleanAndNode,
  BooleanOrNode,
  BooleanIDNode,
} from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";

describe("BooleanAlgebraParser", () => {
  test("parses a simple expression into matching syntax tree", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("(1)^(2)v(3)");
    expect(result).toStrictEqual(
      new BooleanOrNode([
        new BooleanAndNode([new BooleanIDNode(1), new BooleanIDNode(2)]),
        new BooleanIDNode(3),
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
          new BooleanAndNode([new BooleanIDNode(1), new BooleanIDNode(2)]),
          new BooleanIDNode(3),
        ]),
        new BooleanIDNode(4),
      ])
    );
  });

  test("parses a longer concatenation of ANDs into a single node", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("1^2^3^4^5");
    expect(result).toStrictEqual(
      new BooleanAndNode([
        new BooleanIDNode(1),
        new BooleanIDNode(2),
        new BooleanIDNode(3),
        new BooleanIDNode(4),
        new BooleanIDNode(5),
      ])
    );
  });

  test("parses a longer concatenation of ORs into a single node", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("1v2v3v4v5");
    expect(result).toStrictEqual(
      new BooleanOrNode([
        new BooleanIDNode(1),
        new BooleanIDNode(2),
        new BooleanIDNode(3),
        new BooleanIDNode(4),
        new BooleanIDNode(5),
      ])
    );
  });

  test("accepts a string with spaces", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree(
        "5 v 6 v 7 v 8 v 9"
      );
    expect(result).toStrictEqual(
      new BooleanOrNode([
        new BooleanIDNode(5),
        new BooleanIDNode(6),
        new BooleanIDNode(7),
        new BooleanIDNode(8),
        new BooleanIDNode(9),
      ])
    );
  });

  test("accepts a string with multi-digit ids", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("1v20v30");
    expect(result).toStrictEqual(
      new BooleanOrNode([
        new BooleanIDNode(1),
        new BooleanIDNode(20),
        new BooleanIDNode(30),
      ])
    );
  });

  test("accepts ids with leading zeros", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("01v02v03");
    expect(result).toStrictEqual(
      new BooleanOrNode([
        new BooleanIDNode(1),
        new BooleanIDNode(2),
        new BooleanIDNode(3),
      ])
    );
  });

  test("throws an error when the expression contains a invalid symbol", () => {
    expect(() =>
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("6v7v8v9v10:")
    ).toThrowError("Invalid expression");
  });

  test("throws an error when the expression has trailing valid symbols", () => {
    expect(() =>
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("1v2v3v4v5^")
    ).toThrowError("Parsing error");
  });

  test("throws an error when the expression contains extra brackets", () => {
    expect(() =>
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("1v2v(3))v4v5")
    ).toThrowError("Parsing error");
  });

  test("throws an error when closing brackets are missing", () => {
    expect(() =>
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("1v2v(3v4v5")
    ).toThrowError("Parsing error");
  });
});
