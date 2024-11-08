import { Component, Inject, OnInit } from '@angular/core';
import {AmountCriteria, Criteria, DateCriteria, Filter, TitleCriteria} from './data/schema/filter.model';
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
  comparisonTypeOptions: { [key: string]: { value: string, label: string }[] } = {
    AmountCriteria: [
      { value: 'GREATER_THAN', label: 'Greater Than' },
      { value: 'LESS_THAN', label: 'Less Than' },
      { value: 'EQUAL_TO', label: 'Equal To' }
    ],
    TitleCriteria: [
      { value: 'STARTS_WITH', label: 'Starts With' },
      { value: 'ENDS_WITH', label: 'Ends With' },
      { value: 'CONTAINS', label: 'Contains' }
    ],
    DateCriteria: [
      { value: 'GREATER_THAN', label: 'After' },
      { value: 'LESS_THAN', label: 'Before' },
      { value: 'EQUAL_TO', label: 'On' }
    ]
  };

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
    // Add the current criterion to the new filter's criteria list if valid
    if (this.newCriterion.criteriaType === 'AmountCriteria' && this.newCriterion.amount !== undefined) {
      this.newFilter.criteria.push(this.newCriterion as AmountCriteria);
    } else if (this.newCriterion.criteriaType === 'TitleCriteria' && this.newCriterion.title !== undefined) {
      this.newFilter.criteria.push(this.newCriterion as TitleCriteria);
    } else if (this.newCriterion.criteriaType === 'DateCriteria' && this.newCriterion.date !== undefined) {
      this.newFilter.criteria.push(this.newCriterion as DateCriteria);
    }

    // Save the new filter via the backend
    this.filterService.postFilter(this.newFilter).subscribe(
      (savedFilter) => {
        // Add the saved filter to the local list and reset the form
        this.filters.push(savedFilter);
        this.accordionState.push(false);
        this.newFilter = { name: '', criteria: [] };
        this.newCriterion = {};

        // Close the modal
        const anchor = this.document.getElementById('addFilterModal');
        if (anchor) {
          const modal = new Modal(anchor);
          modal.hide();
        }
      },
      (error) => {
        console.error("Error saving filter:", error);
      }
    );
  }
}
