import {Component, OnInit, ViewChild} from '@angular/core';
import { Filter } from './data/schema/filter.model';
import { FilterService } from './data/service/filter.service';
import {FilterModalComponent} from "./components/filter-modal/filter-modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(FilterModalComponent) filterModalComponent!: FilterModalComponent;
  filters: Filter[] = [];
  accordionState: boolean[] = [];
  newFilter: Filter = { name: '', criteria: [] };
  successMessage: string | null = null;
  filterSuccessMessages: { [key: number]: string | null } = {};

  constructor(
    private filterService: FilterService,
  ) {}

  ngOnInit() {
    this.loadFilters();
  }

  loadFilters() {
    this.filterService.getFilters().subscribe(filters => {
      this.filters = filters;
      this.accordionState = new Array(filters.length).fill(false);
    });
  }

  toggleAccordion(index: number): void {
    this.accordionState[index] = !this.accordionState[index];
  }

  openAddFilterModal() {
    if (this.filterModalComponent) {
      this.filterModalComponent.openModal();
    }
  }

  addFilter(newFilter: Filter): void {
    if (newFilter.criteria.length === 0) {
      console.warn("Cannot save a filter with no criteria");
      return;
    }

    this.filterService.postFilter(newFilter).subscribe(
      (savedFilter) => {
        this.filters.push(savedFilter);
        this.accordionState.push(false);

        this.successMessage = 'Filter saved successfully!';
        setTimeout(() => this.successMessage = null, 5000);

        this.newFilter = { name: '', criteria: [] };  // Reset form
      },
      (error) => {
        console.error("Error saving filter:", error);
      }
    );
  }

  deleteFilter(filterId: number): void {
    if (confirm('Are you sure you want to delete this filter?')) {
      this.filterService.deleteFilter(filterId).subscribe(
        () => {
          this.filters = this.filters.filter(filter => filter.id !== filterId);
          this.successMessage = 'Filter deleted successfully!';
          setTimeout(() => this.successMessage = null, 5000);
        },
        (error) => {
          console.error("Error deleting filter:", error);
        }
      );
    }
  }

  // Handle the save from the individual filter component when editing
  saveFilter(updatedFilter: Filter) {
    this.filterService.updateFilter(updatedFilter).subscribe(
      (updatedFilterFromServer) => {
        // Find and update the filter in the array
        const index = this.filters.findIndex((f) => f.id === updatedFilterFromServer.id);
        if (index !== -1) {
          this.filters[index] = updatedFilterFromServer; // Replace the old filter with the updated one
        }

        this.filterSuccessMessages[updatedFilterFromServer.id!] = 'Filter updated successfully!';
        setTimeout(() => {
          this.filterSuccessMessages[updatedFilterFromServer.id!] = null;
        }, 5000);
      },
      (error) => {
        console.error('Error updating filter:', error);
      }
    );
  }
}
