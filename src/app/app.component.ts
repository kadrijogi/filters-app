import { Component, Inject, OnInit } from '@angular/core';
import { AmountCriteria, Criterion, DateCriteria, Filter, TitleCriteria } from './data/schema/filter.model';
import { FilterService } from './data/service/filter.service';
import { Modal } from 'bootstrap';
import { DOCUMENT } from '@angular/common';

type ComparisonType =
  | "GREATER_THAN"
  | "LESS_THAN"
  | "EQUAL_TO"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS";

interface ComparisonOption {
  value: ComparisonType;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filters: Filter[] = [];
  accordionState: boolean[] = [];
  newFilter: Filter = { name: '', criteria: [] }; // Filter object for the form with an empty criteria array
  successMessage: string | null = null;
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

  constructor(
    private filterService: FilterService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    this.loadFilters();
  }

  loadFilters() {
    this.filterService.getFilters().subscribe(filters => {
      this.filters = filters;
      this.accordionState = new Array(filters.length).fill(false);  // Initialize accordion states
    });
  }

  toggleAccordion(index: number): void {
    this.accordionState[index] = !this.accordionState[index];
  }

  openAddFilterModal() {
    const anchor = this.document.getElementById('addFilterModal');
    if (anchor) {
      const modal = new Modal(anchor);
      modal.show();
    }
  }

  addCriterion() {
    // Add a new empty criterion object to the newFilter's criteria array
    this.newFilter.criteria.push({
      criteriaType: 'AmountCriteria', // Default type, can be changed by the user in the form
      comparisonType: 'GREATER_THAN'  // Default comparison type
    });
  }

  removeCriterion(index: number) {
    this.newFilter.criteria.splice(index, 1);
  }

  onCriteriaTypeChange(index: number) {
    // Set the default comparison type when the criteria type changes
    const criterion = this.newFilter.criteria[index];
    if (criterion.criteriaType) {
      criterion.comparisonType = this.comparisonTypeOptions[criterion.criteriaType][0].value;
    }
  }

  addFilter(): void {
    // Ensure the filter has at least one criterion
    if (this.newFilter.criteria.length === 0) {
      console.warn("Cannot save a filter with no criteria");
      return;
    }

    // Post the new filter to the backend
    this.filterService.postFilter(this.newFilter).subscribe(
      (savedFilter) => {
        // Update local state with the saved filter and reset the form
        this.filters.push(savedFilter);
        this.accordionState.push(false);

        // Show success message
        this.successMessage = 'Filter saved successfully!';
        setTimeout(() => this.successMessage = null, 5000);

        this.newFilter = { name: '', criteria: [] };

        // Close the modal
        this.closeAddFilterModal();
      },
      (error) => {
        console.error("Error saving filter:", error);
      }
    );
  }

  // Method to delete a filter
  deleteFilter(filterId: number): void {
    if (confirm('Are you sure you want to delete this filter?')) {
      this.filterService.deleteFilter(filterId).subscribe(
        () => {
          // Remove the filter from the local list
          this.filters = this.filters.filter(filter => filter.id !== filterId);
          this.successMessage = 'Filter deleted successfully!';
          setTimeout(() => this.successMessage = null, 3000);
        },
        (error) => {
          console.error("Error deleting filter:", error);
        }
      );
    }
  }

  closeAddFilterModal() {
    const anchor = this.document.getElementById('addFilterModal');
    if (anchor) {
      const modal = Modal.getInstance(anchor);
      modal?.hide(); // Close the modal using Bootstrap's Modal API
    }
  }
}
