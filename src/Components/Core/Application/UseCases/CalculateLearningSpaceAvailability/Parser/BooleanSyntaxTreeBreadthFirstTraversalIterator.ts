import { BooleanNaryNode, BooleanNode } from "./BooleanSyntaxTree";

export type BreadthFirstTraversalResult = {
  node: BooleanNode;
  parentNodeID: string;
};

type BreadthFirstTraversalQueueItem = { node: BooleanNode; parentID: string };

export default class BooleanSyntaxTreeBreadthFirstTraversalIterator
  implements Iterator<BreadthFirstTraversalResult>
{
  queue: BreadthFirstTraversalQueueItem[] = [];
  visited: BooleanNode[] = [];

  constructor(private tree: BooleanNode) {
    this.queue.push({ node: tree, parentID: "root" });
  }

  next(): IteratorResult<BreadthFirstTraversalResult, undefined> {
    const current = this.queue.shift();
    if (current === undefined)
      return {
        done: true,
        value: undefined,
      };

    this.visited.push(current.node);
    if (current.node instanceof BooleanNaryNode) {
      current.node.Expressions.forEach((expression) => {
        if (!this.visited.includes(expression))
          this.queue.push({ node: expression, parentID: current.node.ID });
      });
    }

    return {
      done: false,
      value: {
        node: current.node,
        parentNodeID: current.parentID,
      },
    };
  }
}
