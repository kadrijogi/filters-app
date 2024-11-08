import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Filter, Criterion } from '../../data/schema/filter.model'; // Import your filter and criterion models

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filter!: Filter;
  @Input() accordionState: boolean = false;  // To manage accordion toggle state
  @Output() delete = new EventEmitter<number>(); // Event to emit when a filter is deleted
  @Output() toggleAccordion = new EventEmitter<void>(); // Event to toggle the accordion state

  // Handle accordion toggle
  onToggleAccordion() {
    this.toggleAccordion.emit();
  }

  // Handle delete filter
  onDelete() {
    this.delete.emit(this.filter.id!);
  }
}
