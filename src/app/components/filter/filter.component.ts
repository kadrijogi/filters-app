import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../../data/schema/filter.model';
import { comparisonTypeOptions } from '../../data/schema/comparison-type.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filter!: Filter;
  @Input() accordionState: boolean = false;
  @Input() successMessage: string | null = null;
  @Output() delete = new EventEmitter<number>(); // Event to emit when a filter is deleted
  @Output() toggleAccordion = new EventEmitter<void>(); // Event to toggle the accordion state
  @Output() saveFilter = new EventEmitter<Filter>();

  originalFilter: Filter = { ...this.filter };
  comparisonTypeOptions = comparisonTypeOptions;

  // Handle accordion toggle
  onToggleAccordion() {
    this.toggleAccordion.emit();
  }

  // Handle delete filter
  onDelete() {
    this.delete.emit(this.filter.id!);
  }

  // Save changes to the filter
  onSave() {
    this.saveFilter.emit(this.filter);
  }

  // Discard changes (close the accordion and revert the filter to its original state)
  onClose() {
    this.filter = { ...this.originalFilter };  // Revert to the original filter state
    this.toggleAccordion.emit(); // Optionally close the accordion
  }
}
