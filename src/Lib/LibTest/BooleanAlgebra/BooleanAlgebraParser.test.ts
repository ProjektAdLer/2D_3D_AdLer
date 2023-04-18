import BooleanAlgebraParser from "../../BooleanAlgebra/BooleanAlgebraParser";

describe("BooleanAlgebraParser", () => {
  test("should parse a simple expression", () => {
    expect(BooleanAlgebraParser.parseToSyntaxTree("((1)^(2)v(3))^(4)")).toBe(
      true
    );
  });

  test("should parse a simple expression", () => {
    expect(BooleanAlgebraParser.parseToSyntaxTree("(3)v((2)^(1))")).toBe(true);
  });

  test("should parse a simple expression", () => {
    expect(BooleanAlgebraParser.parseToSyntaxTree("((1)^(2)")).toBe(false);
  });
});
