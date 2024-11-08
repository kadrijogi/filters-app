import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Criterion } from '../../data/schema/filter.model';
import { ComparisonOption } from "../../data/schema/comparison-type.model";

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent {
  @Input() criterion: Criterion = { criteriaType: 'AmountCriteria', comparisonType: 'GREATER_THAN' };
  @Input() index: number = 0;
  @Output() removeCriterion = new EventEmitter<number>();
  @Output() criteriaTypeChange = new EventEmitter<number>();

  comparisonTypeOptions: { [key: string]: ComparisonOption[] } = {
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

  onCriteriaTypeChange() {
    this.criteriaTypeChange.emit(this.index);
  }

  remove() {
    this.removeCriterion.emit(this.index);
  }
}
