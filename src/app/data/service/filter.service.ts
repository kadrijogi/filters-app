import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  postFilter(filter: Filter): Observable<Filter> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Filter>(this.apiUrl, filter, { headers });
  }

  deleteFilter(filterId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${filterId}`);
  }

  updateFilter(filter: Filter): Observable<Filter> {
    console.log('update filter')
    return this.http.put<Filter>(`${this.apiUrl}/${filter.id}`, filter);
  }

}
