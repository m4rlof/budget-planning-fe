import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  private apiUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/v1'
      : 'https://budget-planning-be.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getGoals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/goals`);
  }

  getGoal(goalId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/goal/${goalId}`);
  }

  createTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/goal/transaction`, transaction);
  }

  createGoal(goal: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/goal`, { goal });
  }
}
