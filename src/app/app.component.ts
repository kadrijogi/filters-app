import {Component, Inject, OnInit} from '@angular/core';
import {Criteria, Filter} from './data/schema/filter.model';
import { FilterService } from './data/service/filter.service';
import { Modal } from 'bootstrap';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filters: Filter[] = [];
  accordionState: boolean[] = [];
  newFilter: Filter = { name: '', criteria: [] }; // Empty filter object for the form
  newCriterion: Partial<Criteria> = {}; // Empty criterion object for the form

  constructor(
    private filterService: FilterService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    console.log('app component init')
    this.filterService.getFilters().subscribe((filters: Filter[]) => {
      this.filters = filters;
      this.accordionState = Array(filters.length).fill(false);
    });
  }

  toggleAccordion(index: number): void {
    // Toggle the current index and close others
    this.accordionState[index] = !this.accordionState[index];
  }

  openAddFilterModal() {
    const anchor = this.document.getElementById('addFilterModal');
    if (anchor) {
      const modal = new Modal(anchor);
      modal.show();
    }
  }

  addFilter(): void {
    if (this.newCriterion.criteriaType) {
      // Add the current criterion to the new filter's criteria list
      this.newFilter.criteria.push({ ...this.newCriterion as Criteria });
    }
    // Save the new filter (for demonstration, push it directly; you may want to send it to the backend)
    this.filters.push({ ...this.newFilter });
    this.accordionState.push(false); // Add accordion state for new filter

    // Reset the form fields
    this.newFilter = { name: '', criteria: [] };
    this.newCriterion = {};

    // Close the modal
    const anchor = this.document.getElementById('addFilterModal');
    if (anchor) {
      const modal = new Modal(anchor);
      modal.hide();
    }
  }
}
