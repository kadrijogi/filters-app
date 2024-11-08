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
}
