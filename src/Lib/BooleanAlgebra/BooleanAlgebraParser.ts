import { injectable } from "inversify";
import {
  BooleanAndNode,
  BooleanNode,
  BooleanOrNode,
  BooleanValueNode,
} from "./BooleanSyntaxTree";

// Recursive descent parser for following grammar:
// +------------------+------------------------+
// | Original Grammar | Left recursion removed |
// +------------------+------------------------+
// | E → E v T | T    | E → T E'               |
// | -                | E' → v T E' | e        |
// | T → T ^ F | F    | T → F T'               |
// | -                | T' → ^ F T' | e        |
// | F → ( E ) | id   | F → ( E ) | id         |
// +------------------+------------------------+
// (with e for epsilon)

@injectable()
export default class LearningRoomAvailabilityStringParser {
  private static parserIndex = 0;

  static parseToSyntaxTree(expression: string): BooleanNode | undefined {
    const tokens = this.convertExpressionToTokenArray(expression);

    this.parserIndex = 0;
    return this.E(tokens);
  }

  private static convertExpressionToTokenArray(expression: string): string[] {
    let index = 0;
    let tokens: string[] = [];
    while (index < expression.length) {
      switch (expression[index]) {
        case " ":
          index++;
          break;

        case "(":
        case ")":
        case "^":
        case "v":
          tokens.push(expression[index]);
          index++;
          break;

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          let value = "";
          while (
            index < expression.length &&
            expression[index] !== "^" &&
            expression[index] !== "v" &&
            expression[index] !== ")" &&
            expression[index] !== "("
          ) {
            value += expression[index];
            index++;
          }
          tokens.push(value);
          break;

        default:
          throw new Error(
            "Invalid expression. Expected a number, ^, v, ( or )"
          );
      }
    }
    return tokens;
  }

  // E →	T E'
  private static E(expression: string[]): BooleanNode {
    const child1 = this.T(expression);
    const child2 = this.E_(expression);
    if (child1) {
      if (child2) {
        if (child2.length === 0) return child1;
        else return new BooleanOrNode([child1, ...child2]);
      }
    }
    this.throwParsingError("E");
  }

  // E' →	v T E' | e
  private static E_(expression: string[]): BooleanNode[] {
    if (expression[this.parserIndex] === "v") {
      this.parserIndex++;
      const child1 = this.T(expression);
      const child2 = this.E_(expression);
      if (child1) {
        if (child2) {
          return [child1, ...child2];
        }
      }
      this.throwParsingError("E'");
    } else {
      return [];
    }
  }

  // T →	F T'
  private static T(expression: string[]): BooleanNode {
    const child1 = this.F(expression);
    const child2 = this.T_(expression);
    if (child1) {
      if (child2) {
        if (child2.length === 0) return child1;
        return new BooleanAndNode([child1, ...child2]);
      }
    }
    this.throwParsingError("T");
  }

  // T' →	^ F T' | e
  private static T_(expression: string[]): BooleanNode[] | undefined {
    if (expression[this.parserIndex] === "^") {
      this.parserIndex++;
      const child1 = this.F(expression);
      const child2 = this.T_(expression);
      if (child1) {
        if (child2) {
          return [child1, ...child2];
        }
      }
      this.throwParsingError("T'");
    } else {
      return [];
    }
  }

  // F → ( E ) | id
  private static F(expression: string[]): BooleanNode | undefined {
    if (expression[this.parserIndex] === "(") {
      this.parserIndex++;
      const childExpression = this.E(expression);
      if (expression[this.parserIndex] === ")") {
        this.parserIndex++;
        return childExpression;
      }
      this.throwParsingError("F");
    } else if (
      // starts with a digit
      expression[this.parserIndex][0] === "0" ||
      expression[this.parserIndex][0] === "1" ||
      expression[this.parserIndex][0] === "2" ||
      expression[this.parserIndex][0] === "3" ||
      expression[this.parserIndex][0] === "4" ||
      expression[this.parserIndex][0] === "5" ||
      expression[this.parserIndex][0] === "6" ||
      expression[this.parserIndex][0] === "7" ||
      expression[this.parserIndex][0] === "8" ||
      expression[this.parserIndex][0] === "9"
    ) {
      const valueNode = new BooleanValueNode(expression[this.parserIndex]);
      this.parserIndex++;
      return valueNode;
    } else {
      this.throwParsingError("F");
    }
  }

  private static throwParsingError(production: string): never {
    throw new Error(
      `Parsing error: Production ${production} failed at index ${this.parserIndex}`
    );
  }
}
