import SIUnit from "./SIUnit";

export default class SIRange {
  public min: SIUnit;
  public max: SIUnit;
  public static ZERO_TO_INFINITY = new SIRange(
    SIUnit.ZERO,
    SIUnit.POSITIVE_INFINITY
  );

  constructor(a: SIUnit, b: SIUnit) {
    if (a.name !== b.name) {
      throw new TypeError("Units must be the same");
    }
    const { large, small } = SIUnit.largerAndSmaller(a, b);

    this.min = small;
    this.max = large;
  }

  public containsValue(value: SIUnit): boolean {
    return value.value >= this.min.value && value.value <= this.max.value;
  }

  public containsRange(other: SIRange): boolean {
    return (
      this.min.value <= other.min.value && this.max.value >= other.max.value
    );
  }

  public intersection(other: SIRange): SIRange {
    if (this.containsRange(other)) {
      return other;
    }
    if (other.containsRange(this)) {
      return this;
    }

    const { large: newMin } = SIUnit.largerAndSmaller(this.min, other.min);
    const { small: newMax } = SIUnit.largerAndSmaller(this.max, other.max);

    const ur = new SIRange(newMin, newMax);
    return ur;
  }

  public apply(fn: (a: SIUnit) => SIUnit): SIRange {
    return new SIRange(fn(this.min), fn(this.max));
  }

  public toString(): string {
    return `(min:${this.min.toString()}, max:${this.max.toString()})`;
  }

  public restrictToPositive(): SIRange {
    const min = this.min.value < 0 ? SIUnit.ZERO : this.min;
    return new SIRange(min, this.max);
  }
}
