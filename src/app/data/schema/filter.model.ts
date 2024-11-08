export interface AmountCriteria {
  criteriaType: 'AmountCriteria';
  id?: number;
  amount?: number;
  comparisonType: 'GREATER_THAN' | 'LESS_THAN' | 'EQUAL_TO';
}

export interface TitleCriteria {
  criteriaType: 'TitleCriteria';
  id?: number;
  title?: string;
  comparisonType: 'STARTS_WITH' | 'ENDS_WITH' | 'CONTAINS';
}

export interface DateCriteria {
  criteriaType: 'DateCriteria';
  id?: number;
  date?: string;
  comparisonType: 'GREATER_THAN' | 'LESS_THAN' | 'EQUAL_TO';
}

export type Criterion = AmountCriteria | TitleCriteria | DateCriteria;

export interface Filter {
  id?: number;
  name: string;
  criteria: Criterion[];
}
