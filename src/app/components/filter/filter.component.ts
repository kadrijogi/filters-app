import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Filter } from '../../data/schema/filter.model';
import { comparisonTypeOptions } from '../../data/schema/comparison-type.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filter!: Filter;
  @Input() accordionState: boolean = false;
  @Input() successMessage: string | null = null;
  @Output() delete = new EventEmitter<number>(); // Event to emit when a filter is deleted
  @Output() toggleAccordion = new EventEmitter<void>(); // Event to toggle the accordion state
  @Output() edit = new EventEmitter<number>();
  @Output() saveFilter = new EventEmitter<Filter>();

  editMode: boolean = false;
  originalFilter!: Filter;
  comparisonTypeOptions = comparisonTypeOptions;

  ngOnInit() {
    this.originalFilter = JSON.parse(JSON.stringify(this.filter));
  }

  // Handle accordion toggle
  onToggleAccordion() {
    this.toggleAccordion.emit();
  }

  // Handle delete filter
  onDelete() {
    this.delete.emit(this.filter.id!);
  }

  // Activate edit mode and create a copy of the filter to edit
  onEdit(): void {
    this.editMode = !this.editMode;
    //this.onToggleAccordion();
  }


  // Save changes to the filter
  onSave() {
    this.saveFilter.emit(this.filter);
  }

  // Discard changes (close the accordion and revert the filter to its original state)
  onClose() {
    this.editMode = false;
    this.resetFilterFields();
  }

  private resetFilterFields(): void {
    // Only reset the fields that are editable in the criteria, not the entire object
    this.filter.criteria = JSON.parse(JSON.stringify(this.originalFilter.criteria));
  }

  addCriterion() {
    this.filter.criteria.push({
      criteriaType: 'AmountCriteria',
      comparisonType: 'GREATER_THAN'
    });
  }

  removeCriterion(index: number) {
    this.filter.criteria.splice(index, 1);
  }

  onCriteriaTypeChange(index: number) {
    const criterion = this.filter.criteria[index];
    if (criterion.criteriaType) {
      criterion.comparisonType = this.comparisonTypeOptions[criterion.criteriaType][0].value;
    }
  }
}
