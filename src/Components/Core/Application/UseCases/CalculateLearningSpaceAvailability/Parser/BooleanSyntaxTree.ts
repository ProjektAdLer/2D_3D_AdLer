import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export class EvaluationMap extends Map<ComponentID, boolean> {}

export abstract class BooleanNode {
  abstract evaluate(evaluationMap: EvaluationMap): boolean;
}

export abstract class BooleanNaryNode extends BooleanNode {
  get Expressions(): BooleanNode[] {
    return this.expressions;
  }

  constructor(private readonly expressions: BooleanNode[]) {
    super();
  }
}

export class BooleanIDNode extends BooleanNode {
  get Value(): ComponentID {
    return this.value;
  }

  constructor(private readonly value: ComponentID) {
    super();
  }

  evaluate(evaluationMap: EvaluationMap): boolean {
    const lookupValue = evaluationMap.get(this.value);
    if (lookupValue !== undefined) return lookupValue;
    else return false;
  }
}

export class BooleanAndNode extends BooleanNaryNode {
  evaluate(evaluationMap: EvaluationMap): boolean {
    return !this.Expressions.some((expression) => {
      return expression.evaluate(evaluationMap) === false;
    });
  }
}

export class BooleanOrNode extends BooleanNaryNode {
  evaluate(evaluationMap: EvaluationMap): boolean {
    return this.Expressions.some((expression) => {
      return expression.evaluate(evaluationMap) === true;
    });
  }
}
