import { Component, OnInit } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { Router } from '@angular/router';
import { PlanningsService } from '../../shared/services/plannings/plannings.service';
import moment from 'moment';
import { GoalsService } from '../../shared/services/goals/goals.service';

@Component({
  selector: 'app-goals',
  imports: [PageBreadcrumbComponent],
  templateUrl: './goals.component.html',
  styles: ``,
})
export class GoalsComponent implements OnInit {
  public goals: any[] = [];

  constructor(private router: Router, private goalsService: GoalsService) {}

  ngOnInit(): void {
    this.goalsService.getGoals().subscribe((res: any) => {
      this.goals = res.data;
    });
  }

  getMonthName(monthNumber: number) {
    return moment()
      .month(monthNumber - 1)
      .format('MMMM');
  }

  goToGoal(goalId: any) {
    this.router.navigate(['/goal', goalId]);
  }

  goTo() {
    this.router.navigate(['/goal/create']);
  }
}
