import { injectable } from "inversify";
import {
  BooleanAndNode,
  BooleanNode,
  BooleanOrNode,
  BooleanValueNode,
} from "./BooleanSyntaxTree";

/**
 * WORK IN PROGRESS - DEFINITLY CONTAINS BUGS
 * LL(1)-Parser for boolean algebra expressions.
 * Supports the following alphabet:
 * '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '^', 'v', '(', ')', ' '
 * Supports the following grammar:
 * E -> (S) | (S^E) | (SvE)
 * S -> E | [0-9]
 */

@injectable()
export default class BooleanAlgebraParser {
  private static parserIndex = 0;

  static parseToSyntaxTree(expression: string): BooleanNode {
    const tokens = this.convertExpressionToTokenArray(expression);

    this.parserIndex = 0;
    return this.parseExpression(tokens);
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

  private static parseExpression(expression: string[]): BooleanNode {
    if (expression[this.parserIndex] === "(") {
      this.parserIndex++;
      let leftExpression = this.parseSubExpression(expression);

      if (expression[this.parserIndex] === "^") {
        this.parserIndex++;
        let rightExpression = this.parseExpression(expression);
        return new BooleanAndNode(leftExpression, rightExpression);
      } else if (expression[this.parserIndex] === "v") {
        this.parserIndex++;
        let rightExpression = this.parseExpression(expression);
        return new BooleanOrNode(leftExpression, rightExpression);
      } else if (expression[this.parserIndex] === ")") {
        this.parserIndex++;
        return leftExpression;
      } else {
        throw new Error("Invalid expression. Expected '^', 'v' or ')'.");
      }
    } else {
      throw new Error("Invalid expression. Expected (.");
    }
  }

  private static parseSubExpression(expression: string[]): BooleanNode {
    if (expression[this.parserIndex] === "(") {
      this.parserIndex++;
      let subExpression = this.parseExpression(expression);
      if (expression[this.parserIndex] !== ")") {
        throw new Error("Invalid expression. Expected ).");
      }
      this.parserIndex++;
      return subExpression;
    } else {
      const value = expression[this.parserIndex];
      this.parserIndex++;
      return new BooleanValueNode(value);
    }
  }
}
