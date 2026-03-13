import { Component, OnInit } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { TransactionsService } from '../../shared/services/transactions/transactions.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { GoalsService } from '../../shared/services/goals/goals.service';

@Component({
  selector: 'app-planning-detail',
  imports: [
    PageBreadcrumbComponent,
    ModalComponent,
    ButtonComponent,
    LabelComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    SelectComponent,
  ],
  templateUrl: './goal-detail.component.html',
  styles: ``,
})
export class GoalDetailComponent implements OnInit {
  public weeks: any[] = [];
  week: any;
  month: any;
  isOpen = false;
  form!: FormGroup;
  categories: any[] = [];
  monthId: any;

  goalId: any;
  goal: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private goalService: GoalsService
  ) {
    this.form = this.fb.group({
      contribution_amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.goalId = this.route.snapshot.paramMap.get('goal_id');
    this.loadGoal();
  }

  loadGoal() {
    this.goalService.getGoal(this.goalId).subscribe((res: any) => {
      this.goal = res.data;
    });
  }

  convertDate(date: any) {
    return moment(date).format('DD/MM/YY');
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  handleSave() {
    const contribution_amount = this.form.get('contribution_amount')?.value;
    const transaction = {
      contribution_amount: Number(contribution_amount),
      goal_id: Number(this.goalId),
    };

    this.goalService.createTransaction(transaction).subscribe((res) => {
      this.loadGoal();
      this.closeModal();
    });
  }
}
