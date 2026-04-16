import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsightsService {
  private apiUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/v1'
      : 'https://budget-planning-be.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getCurrentMonthSaving(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/insights/monthly-saving`);
  }

  getMostExpensiveCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/insights/expense-category`);
  }

  getGoals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/insights/goals`);
  }

  getGoal(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/insights/goal/${id}`);
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/financial-entries/fixed-totals`);
  }
}
