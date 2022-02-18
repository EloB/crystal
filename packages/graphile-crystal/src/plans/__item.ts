import chalk from "chalk";

import { getCurrentParentPathIdentity } from "../global";
import { ExecutablePlan } from "../plan";

/**
 * An __ItemPlan is an internal plan (users must never construct it
 * themselves!) that Crystal uses to refer to an individual item within a list
 * or stream.
 */
export class __ItemPlan<TData> extends ExecutablePlan<TData> {
  static $$export = {
    moduleName: "graphile-crystal",
    exportName: "__ItemPlan",
  };
  sync = true;

  /**
   * @internal
   */
  public transformPlanId?: string;

  constructor(
    parentPlan: ExecutablePlan<TData> | ExecutablePlan<TData[]>,
    public readonly depth = 0,
  ) {
    super();
    this.parentPathIdentity = getCurrentParentPathIdentity();
    this.addDependency(parentPlan);
  }

  toStringMeta(): string {
    return chalk.bold.yellow(
      String(this.aether.dangerouslyGetPlan(this.dependencies[0]).id),
    );
  }

  execute(): never {
    throw new Error("__ItemPlan must never execute");
  }
}
