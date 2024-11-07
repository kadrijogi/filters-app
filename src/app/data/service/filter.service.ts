import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import { Filter } from '../schema/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private apiUrl = 'http://localhost:8080/filters/user/1';

  constructor(private http: HttpClient) { }

  getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching filters:', error);
        throw error;
      })
    );
  }
}
