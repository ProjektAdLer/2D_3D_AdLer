import { injectable } from "inversify";
import {
  BooleanAndNode,
  BooleanBinaryNode,
  BooleanNode,
  BooleanOrNode,
  BooleanValueNode,
} from "./BooleanSyntaxTree";

// Grammar:
// E →	T E'
// E' →	or T E' | e
// T →	F T'
// T' →	and F T' | e
// F → ( E ) | (id)
// (with e for epsilon)

@injectable()
export default class BooleanAlgebraParser {
  private static parserIndex = 0;

  static parseToSyntaxTree(expression: string): boolean {
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
  private static E(expression: string[]): boolean {
    if (this.T(expression)) {
      if (this.E_(expression)) {
        return true;
      }
    }
    console.log("E failed");
    return false;
  }

  // E' →	or T E' | e
  private static E_(expression: string[]): boolean {
    if (expression[this.parserIndex] === "v") {
      this.parserIndex++;
      if (this.T(expression)) {
        if (this.E_(expression)) {
          return true;
        }
      }
      console.log("E_ failed");
      return false;
    } else {
      return true;
    }
  }

  // T →	F T'
  private static T(expression: string[]): boolean {
    if (this.F(expression)) {
      if (this.T_(expression)) {
        return true;
      }
    }
    console.log("T failed");
    return false;
  }

  // T' →	and F T' | e
  private static T_(expression: string[]): boolean {
    if (expression[this.parserIndex] === "^") {
      this.parserIndex++;
      if (this.F(expression)) {
        if (this.T_(expression)) {
          return true;
        }
      }
      console.log("T_ failed");
      return false;
    } else {
      return true;
    }
  }

  // F → ( E ) | (id)
  private static F(expression: string[]): boolean {
    if (expression[this.parserIndex] === "(") {
      this.parserIndex++;
      if (this.E(expression)) {
        if (expression[this.parserIndex] === ")") {
          this.parserIndex++;
          return true;
        }
      }
      console.log("F failed");
      return false;
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
      this.parserIndex++;
      return true;
    } else {
      console.log("F failed");
      return false;
    }
  }
}
