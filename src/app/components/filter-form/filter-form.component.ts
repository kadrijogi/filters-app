import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter } from '../../data/schema/filter.model';
import { comparisonTypeOptions } from '../../data/schema/comparison-type.model';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent {
  @Input() filterToEdit: Filter = { name: '', criteria: [] };
  @Output() saveFilter = new EventEmitter<Filter>();
  @Output() closeModal = new EventEmitter<void>();

  comparisonTypeOptions = comparisonTypeOptions;

  addCriterion() {
    this.filterToEdit.criteria.push({
      criteriaType: 'AmountCriteria',
      comparisonType: 'GREATER_THAN'
    });
  }

  removeCriterion(index: number) {
    this.filterToEdit.criteria.splice(index, 1);
  }

  onCriteriaTypeChange(index: number) {
    const criterion = this.filterToEdit.criteria[index];
    if (criterion.criteriaType) {
      criterion.comparisonType = this.comparisonTypeOptions[criterion.criteriaType][0].value;
    }
  }

  close() {
    this.closeModal.emit();
  }

  save() {
    this.saveFilter.emit(this.filterToEdit);
    this.close();
  }
}
