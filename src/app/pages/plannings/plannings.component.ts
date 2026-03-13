import { Component, OnInit } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { Router } from '@angular/router';
import { PlanningsService } from '../../shared/services/plannings/plannings.service';
import moment from 'moment';

@Component({
  selector: 'app-plannings',
  imports: [PageBreadcrumbComponent],
  templateUrl: './plannings.component.html',
  styles: ``,
})
export class PLanningsComponent implements OnInit {
  public plannings: any[] = [];

  constructor(
    private router: Router,
    private planningsService: PlanningsService
  ) {}

  ngOnInit(): void {
    this.planningsService.getPlannings().subscribe((res: any) => {
      this.plannings = res.data;
    });
  }

  getMonthName(monthNumber: number) {
    return moment()
      .month(monthNumber - 1)
      .format('MMMM');
  }

  goToPlanningMonth(monthId: any) {
    this.router.navigate(['/plannings', monthId]);
  }

  goTo() {
    this.router.navigate(['/plannings/create']);
  }
}
