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

export const comparisonTypeOptions: { [key: string]: ComparisonOption[] } = {
  AmountCriteria: [
    { value: "GREATER_THAN", label: "Greater Than" },
    { value: "LESS_THAN", label: "Less Than" },
    { value: "EQUAL_TO", label: "Equal To" }
  ],
  TitleCriteria: [
    { value: "STARTS_WITH", label: "Starts With" },
    { value: "ENDS_WITH", label: "Ends With" },
    { value: "CONTAINS", label: "Contains" }
  ],
  DateCriteria: [
    { value: "GREATER_THAN", label: "After" },
    { value: "LESS_THAN", label: "Before" },
    { value: "EQUAL_TO", label: "On" }
  ]
};
