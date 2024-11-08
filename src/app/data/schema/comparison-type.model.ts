export type ComparisonType =
  | "GREATER_THAN"
  | "LESS_THAN"
  | "EQUAL_TO"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS";

export interface ComparisonOption {
  value: ComparisonType;
  label: string;
}
