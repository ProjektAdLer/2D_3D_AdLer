export class EvaluationMap extends Map<string, boolean> {}

export abstract class BooleanNode {
  abstract evaluate(evaluationMap: EvaluationMap): boolean;
}

export abstract class BooleanBinaryNode extends BooleanNode {
  get LeftExpression(): BooleanNode {
    return this.leftExpression;
  }
  get RightExpression(): BooleanNode {
    return this.rightExpression;
  }

  constructor(
    private readonly leftExpression: BooleanNode,
    private readonly rightExpression: BooleanNode
  ) {
    super();
  }
}

export abstract class BooleanNaryNode extends BooleanNode {
  get Expressions(): BooleanNode[] {
    return this.expressions;
  }

  constructor(private readonly expressions: BooleanNode[]) {
    super();
  }
}

export class BooleanValueNode extends BooleanNode {
  get Value(): string {
    return this.value;
  }
  constructor(private readonly value: string) {
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
