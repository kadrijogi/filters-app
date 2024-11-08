import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, Inject } from '@angular/core';
import { Modal } from 'bootstrap';
import { DOCUMENT } from '@angular/common';
import { Filter } from '../../data/schema/filter.model';
import { comparisonTypeOptions } from "../../data/schema/comparison-type.model";

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit, OnDestroy {
  @Input() filterToEdit: Filter = { name: '', criteria: [] };
  @Output() saveFilter = new EventEmitter<Filter>();
  @Output() closeModal = new EventEmitter<void>();

  private modal: Modal | undefined;
  comparisonTypeOptions = comparisonTypeOptions;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    const modalElement = this.document.getElementById('addFilterModal');
    if (modalElement) {
      this.modal = new Modal(modalElement);
    }
  }

  ngOnDestroy(): void {
    if (this.modal) {
      this.modal.dispose(); // Cleanup the modal instance when component is destroyed
    }
  }

  public openModal() {
    if (this.modal) {
      this.modal.show();
    }
  }

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
    if (this.modal) {
      this.filterToEdit = { name: '', criteria: [] }
      this.modal.hide();
    }
  }

  save() {
    this.saveFilter.emit(this.filterToEdit);
    this.close();
  }
}
