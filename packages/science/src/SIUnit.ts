type SIResult = {
  ok: SIUnit | undefined;
  error: Error | undefined;
};

export class SIUnit {
  public name: string;
  public value: number;

  public static ZERO = new SIUnit(0, "");
  public static POSITIVE_INFINITY = new SIUnit(Number.POSITIVE_INFINITY, "");

  constructor(value: number, name: string) {
    this.value = value;
    this.name = name;
  }

  public static verifyUnitSameness(things: SIUnit[]): Error | undefined {
    const names = [new Set(things.map((t) => t.name))];
    if (names.length > 1) {
      return new TypeError("Units must be the same");
    }
    return;
  }

  public static largerAndSmaller(
    a: SIUnit,
    b: SIUnit
  ): { large: SIUnit; small: SIUnit } {
    function getBoth(a: SIUnit, b: SIUnit): { large: SIUnit; small: SIUnit } {
      return a.value >= b.value
        ? { large: a, small: b }
        : { large: b, small: a };
    }
    // return this.errorCatcherForTwo(getBoth, a, b);
    return getBoth(a, b);
  }

  private static errorCatcherForTwo(
    fn: (a: SIUnit, b: SIUnit) => SIUnit,
    a: SIUnit,
    b: SIUnit
  ): SIResult {
    const error = this.verifyUnitSameness([a, b]);
    if (error) {
      return { ok: undefined, error };
    }
    const r = fn(a, b);
    return { ok: r, error: undefined };
  }

  public static addTwo(a: SIUnit, b: SIUnit): SIResult {
    const add = (a: SIUnit, b: SIUnit) => {
      return new SIUnit(a.value + b.value, a.name);
    };
    return this.errorCatcherForTwo(add, a, b);
  }

  public static multiplyTwo(a: SIUnit, b: SIUnit): SIResult {
    const multiply = (a: SIUnit, b: SIUnit) => {
      return new SIUnit(a.value * a.value, a.name);
    };
    return this.errorCatcherForTwo(multiply, a, b);
  }

  public static divide(numerator: SIUnit, denominator: SIUnit): SIResult {
    const divide = (numerator: SIUnit, denominator: SIUnit) => {
      return new SIUnit(numerator.value / denominator.value, numerator.name);
    };
    return this.errorCatcherForTwo(divide, numerator, denominator);
  }

  public static cos(u: SIUnit): number {
    return Math.cos(u.value);
  }

  public static sin(u: SIUnit): number {
    return Math.sin(u.value);
  }

  public toString(): string {
    return `${this.value} ${this.name}`;
  }
}
