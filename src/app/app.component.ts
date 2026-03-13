import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesService } from './shared/services/categories/categories.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular Ecommerce Dashboard | TailAdmin';
  
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.loadSubcategories().subscribe();
  }
}
