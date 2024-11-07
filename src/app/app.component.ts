import { Component, OnInit } from '@angular/core';
import { Filter } from './data/schema/filter.model';
import { FilterService } from './data/service/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filters: Filter[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    console.log('app component init')
    this.filterService.getFilters().subscribe((filters: Filter[]) => {
      this.filters = filters;
    });
  }
}
