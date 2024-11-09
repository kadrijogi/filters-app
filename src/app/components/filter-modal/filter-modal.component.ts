import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, Inject } from '@angular/core';
import { Modal } from 'bootstrap';
import { DOCUMENT } from '@angular/common';
import { Filter } from '../../data/schema/filter.model';

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

  close() {
    if (this.modal) {
      this.filterToEdit = { name: '', criteria: [] }
      this.modal.hide();
    }
  }
}
