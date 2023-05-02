import { v4 as uuidv4 } from "uuid";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import BooleanSyntaxTreeBreadthFirstTraversalIterator, {
  BreadthFirstTraversalResult,
} from "./BooleanSyntaxTreeBreadthFirstTraversalIterator";

export class EvaluationMap extends Map<ComponentID, boolean> {}

export abstract class BooleanNode
  implements Iterable<BreadthFirstTraversalResult>
{
  protected type: string; // mainly for testing purposes to enable object matching

  abstract get ID(): string;
  get Type(): string {
    return this.type;
  }

  abstract evaluate(evaluationMap: EvaluationMap): boolean;
  abstract containsID(id: ComponentID): boolean;
  abstract toString(): string;

  [Symbol.iterator](): Iterator<BreadthFirstTraversalResult> {
    return new BooleanSyntaxTreeBreadthFirstTraversalIterator(this);
  }
  breadthFirstTraversal(): BooleanSyntaxTreeBreadthFirstTraversalIterator {
    return new BooleanSyntaxTreeBreadthFirstTraversalIterator(this);
  }
}

export abstract class BooleanNaryNode extends BooleanNode {
  get Expressions(): BooleanNode[] {
    return this.expressions;
  }

  constructor(private readonly expressions: BooleanNode[]) {
    super();
  }

  containsID(id: ComponentID): boolean {
    return this.Expressions.some((expression) => {
      return expression.containsID(id);
    });
  }
}

export class BooleanIDNode extends BooleanNode {
  protected type: string = "ID";

  get Value(): ComponentID {
    return this.value;
  }
  get ID(): string {
    return this.value.toString();
  }

  constructor(private readonly value: ComponentID) {
    super();
  }

  evaluate(evaluationMap: EvaluationMap): boolean {
    const lookupValue = evaluationMap.get(this.value);
    if (lookupValue !== undefined) return lookupValue;
    else return false;
  }

  containsID(id: ComponentID): boolean {
    return this.value === id;
  }

  toString(): string {
    return "(" + this.value.toString() + ")";
  }
}

export class BooleanAndNode extends BooleanNaryNode {
  protected type = "AND";
  protected id: string = uuidv4();

  get ID(): string {
    return this.id;
  }

  evaluate(evaluationMap: EvaluationMap): boolean {
    return !this.Expressions.some((expression) => {
      return expression.evaluate(evaluationMap) === false;
    });
  }

  toString(): string {
    return (
      "(" +
      this.Expressions.map((expression) => {
        return expression.toString();
      }).join(" ^ ") +
      ")"
    );
  }
}

export class BooleanOrNode extends BooleanNaryNode {
  protected type = "OR";
  protected id: string = uuidv4();

  get ID(): string {
    return this.id;
  }

  evaluate(evaluationMap: EvaluationMap): boolean {
    return this.Expressions.some((expression) => {
      return expression.evaluate(evaluationMap) === true;
    });
  }

  toString(): string {
    return (
      "(" +
      this.Expressions.map((expression) => {
        return expression.toString();
      }).join(" v ") +
      ")"
    );
  }
}
