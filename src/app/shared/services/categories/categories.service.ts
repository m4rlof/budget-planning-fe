import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/v1'
      : 'https://budget-planning-be.onrender.com/api/v1';

  private subcategoriesSubject = new BehaviorSubject<any[]>([]);
  subcategories$ = this.subcategoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método para carregar os dados do backend
  loadSubcategories(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/subcategories`)
      .pipe(tap((data) => this.subcategoriesSubject.next(data)));
  }
}
