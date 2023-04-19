import LearningRoomAvailabilityStringParser from "../../BooleanAlgebra/BooleanAlgebraParser";

describe("BooleanAlgebraParser", () => {
  test("should parse a simple expression", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree(
        "((1)^(2)v(3))^(4)"
      );
    expect(result).toBeDefined();
  });

  test("should parse a simple expression", () => {
    const result =
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("(3)v((2)^(1))");
    expect(result).toBeDefined();
  });

  test("should parse a simple expression", () => {
    const result = LearningRoomAvailabilityStringParser.parseToSyntaxTree(
      "(3)v(2)^(1)v(4)^(5)"
    );
    expect(result).toBeDefined();
  });

  test("should parse a simple expression", () => {
    const result = LearningRoomAvailabilityStringParser.parseToSyntaxTree(
      "(3)^(2)^(1)^(4)^(5)"
    );
    expect(result).toBeDefined();
  });

  test.skip("should parse a simple expression", () => {
    expect(
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("3v2^1v2")
    ).toBe(true);
  });

  test.skip("should parse a simple expression", () => {
    expect(
      LearningRoomAvailabilityStringParser.parseToSyntaxTree("((1)^(2)")
    ).toBe(null);
  });
});
