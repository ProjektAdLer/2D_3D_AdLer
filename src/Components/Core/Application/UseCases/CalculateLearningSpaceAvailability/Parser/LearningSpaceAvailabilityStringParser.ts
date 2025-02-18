import { injectable } from "inversify";
import {
  BooleanAndNode,
  BooleanNode,
  BooleanOrNode,
  BooleanIDNode,
} from "./BooleanSyntaxTree";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

// Recursive descent parser for following grammar:
// +------------------+-------------------------+
// | Original Grammar | Left recursions removed |
// +------------------+-------------------------+
// | E → E v T | T    | E → T E'                |
// |                  | E' → v T E' | e         |
// | T → T ^ F | F    | T → F T'                |
// |                  | T' → ^ F T' | e         |
// | F → ( E ) | id   | F → ( E ) | id          |
// +------------------+-------------------------+
// (with e for epsilon i.e. an empty production)

@injectable()
export default class LearningSpaceAvailabilityStringParser {
  private static parserIndex = 0;

  static parseToSyntaxTree(expression: string): BooleanNode {
    const tokens = this.convertExpressionToTokenArray(expression);

    this.parserIndex = 0;
    const result = this.E(tokens);
    if (this.parserIndex !== tokens.length)
      throw new Error("Parsing error. Unexpected end of expression");

    return result;
  }

  static parseToIdArray(expression: string): ComponentID[] {
    const tokens = this.convertExpressionToTokenArray(expression);

    let ids: ComponentID[] = [];
    tokens.forEach((tokens) => {
      const convertedToken = +tokens;
      if (!isNaN(convertedToken)) {
        ids.push(convertedToken);
      }
    });

    return ids;
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
        case "9": {
          let value = "";
          while (
            index < expression.length &&
            expression[index] !== " " &&
            !isNaN(+expression[index])
          ) {
            value += expression[index];
            index++;
          }
          tokens.push(value);
          break;
        }
        default:
          throw new Error(
            "Invalid expression. Expected only numbers, ^, v, ( or )"
          );
      }
    }
    return tokens;
  }

  // E →	T E'
  private static E(expression: string[]): BooleanNode {
    const TSubExpression = this.T(expression);
    const E_SubExpression = this.E_(expression);
    if (E_SubExpression.length === 0) return TSubExpression;
    else return new BooleanOrNode([TSubExpression, ...E_SubExpression]);
  }

  // E' →	v T E' | e
  private static E_(expression: string[]): BooleanNode[] {
    if (expression[this.parserIndex] && expression[this.parserIndex] === "v") {
      this.parserIndex++;
      return [this.T(expression), ...this.E_(expression)];
    } else {
      return [];
    }
  }

  // T →	F T'
  private static T(expression: string[]): BooleanNode {
    const FSubExpression = this.F(expression);
    const T_SubExpression = this.T_(expression);
    if (T_SubExpression.length === 0) return FSubExpression;
    return new BooleanAndNode([FSubExpression, ...T_SubExpression]);
  }

  // T' →	^ F T' | e
  private static T_(expression: string[]): BooleanNode[] {
    if (expression[this.parserIndex] && expression[this.parserIndex] === "^") {
      this.parserIndex++;
      return [this.F(expression), ...this.T_(expression)];
    } else {
      return [];
    }
  }

  // F → ( E ) | id
  private static F(expression: string[]): BooleanNode {
    if (expression[this.parserIndex] === "(") {
      this.parserIndex++;
      const ESubExpression = this.E(expression);
      if (expression[this.parserIndex] === ")") {
        this.parserIndex++;
        return ESubExpression;
      }
      this.throwParsingError("F");
    } else if (
      expression[this.parserIndex] &&
      // starts with a digit
      (expression[this.parserIndex].startsWith("0") ||
        expression[this.parserIndex].startsWith("1") ||
        expression[this.parserIndex].startsWith("2") ||
        expression[this.parserIndex].startsWith("3") ||
        expression[this.parserIndex].startsWith("4") ||
        expression[this.parserIndex].startsWith("5") ||
        expression[this.parserIndex].startsWith("6") ||
        expression[this.parserIndex].startsWith("7") ||
        expression[this.parserIndex].startsWith("8") ||
        expression[this.parserIndex].startsWith("9"))
    ) {
      const valueNode = new BooleanIDNode(+expression[this.parserIndex]);
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
