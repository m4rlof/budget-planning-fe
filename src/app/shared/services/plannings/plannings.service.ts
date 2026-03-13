import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanningsService {
  private apiUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/v1'
      : 'https://budget-planning-be.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  getPlannings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/plannings`);
  }

  getPlanningWeeks(monthId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/planning/${monthId}`);
  }

  createTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transaction/create`, {
      transaction,
    });
  }

  createPlanning(planning: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/planning/create`, planning);
  }
}
