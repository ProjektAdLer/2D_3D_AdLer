import LearningSpaceAvailabilityStringParser from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/LearningSpaceAvailabilityStringParser";
import {
  BooleanAndNode,
  BooleanOrNode,
  BooleanIDNode,
} from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";

describe("BooleanAlgebraParser", () => {
  test("parses a simple expression into matching syntax tree", () => {
    const result =
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree("(1)^(2)v(3)");
    console.log(result);
    expect(result).toMatchObject({
      type: "OR",
      expressions: [
        {
          type: "AND",
          expressions: [
            {
              type: "ID",
              value: 1,
            },
            {
              type: "ID",
              value: 2,
            },
          ],
        },
        {
          type: "ID",
          value: 3,
        },
      ],
    });
  });

  test("parses a complex expression with brackets into matching syntax tree", () => {
    const result =
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree(
        "((1)^(2)v(3))^(4)"
      );
    expect(result).toMatchObject({
      type: "AND",
      expressions: [
        {
          type: "OR",
          expressions: [
            {
              type: "AND",
              expressions: [
                {
                  type: "ID",
                  value: 1,
                },
                {
                  type: "ID",
                  value: 2,
                },
              ],
            },
            {
              type: "ID",
              value: 3,
            },
          ],
        },
        {
          type: "ID",

          value: 4,
        },
      ],
    });
  });

  test("parses a longer concatenation of ANDs into a single node", () => {
    const result =
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree("1^2^3^4^5");
    expect(result).toMatchObject({
      type: "AND",
      expressions: [
        {
          type: "ID",
          value: 1,
        },
        {
          type: "ID",
          value: 2,
        },
        {
          type: "ID",
          value: 3,
        },
        {
          type: "ID",
          value: 4,
        },
        {
          type: "ID",
          value: 5,
        },
      ],
    });
  });

  test("parses a longer concatenation of ORs into a single node", () => {
    const result =
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree("1v2v3v4v5");
    expect(result).toMatchObject({
      type: "OR",
      expressions: [
        {
          type: "ID",
          value: 1,
        },
        {
          type: "ID",
          value: 2,
        },
        {
          type: "ID",
          value: 3,
        },
        {
          type: "ID",
          value: 4,
        },
        {
          type: "ID",
          value: 5,
        },
      ],
    });
  });

  test("accepts a string with spaces", () => {
    const result =
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree(
        "5 v 6 v 7 v 8 v 9"
      );
    expect(result).toMatchObject({
      type: "OR",
      expressions: [
        {
          type: "ID",
          value: 5,
        },
        {
          type: "ID",
          value: 6,
        },
        {
          type: "ID",
          value: 7,
        },
        {
          type: "ID",
          value: 8,
        },
        {
          type: "ID",
          value: 9,
        },
      ],
    });
  });

  test("accepts a string with multi-digit ids", () => {
    const result =
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree("1v20v30");
    expect(result).toMatchObject({
      type: "OR",
      expressions: [
        {
          type: "ID",
          value: 1,
        },
        {
          type: "ID",
          value: 20,
        },
        {
          type: "ID",
          value: 30,
        },
      ],
    });
  });

  test("accepts ids with leading zeros", () => {
    const result =
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree("01v02v03");
    expect(result).toMatchObject({
      type: "OR",
      expressions: [
        {
          type: "ID",
          value: 1,
        },
        {
          type: "ID",
          value: 2,
        },
        {
          type: "ID",
          value: 3,
        },
      ],
    });
  });

  test("throws an error when the expression contains a invalid symbol", () => {
    expect(() =>
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree("6v7v8v9v10:")
    ).toThrowError("Invalid expression");
  });

  test("throws an error when the expression has trailing valid symbols", () => {
    expect(() =>
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree("1v2v3v4v5^")
    ).toThrowError("Parsing error");
  });

  test("throws an error when the expression contains extra brackets", () => {
    expect(() =>
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree("1v2v(3))v4v5")
    ).toThrowError("Parsing error");
  });

  test("throws an error when closing brackets are missing", () => {
    expect(() =>
      LearningSpaceAvailabilityStringParser.parseToSyntaxTree("1v2v(3v4v5")
    ).toThrowError("Parsing error");
  });

  test("parses a simple expression into an ID array", () => {
    const result =
      LearningSpaceAvailabilityStringParser.parseToIdArray("(1)^(2)v(3)");
    expect(result).toStrictEqual([1, 2, 3]);
  });
});
