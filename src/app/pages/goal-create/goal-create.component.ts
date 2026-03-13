import { Component, OnInit } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { DatePickerComponent } from '../../shared/components/form/date-picker/date-picker.component';
import { RadioComponent } from '../../shared/components/form/input/radio.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';
import moment from 'moment';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlanningsService } from '../../shared/services/plannings/plannings.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Router } from '@angular/router';
import { GoalsService } from '../../shared/services/goals/goals.service';

@Component({
  selector: 'app-planning-create',
  imports: [
    PageBreadcrumbComponent,
    DatePickerComponent,
    RadioComponent,
    LabelComponent,
    SelectComponent,
    InputFieldComponent,
    ButtonComponent,
    BadgeComponent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './goal-create.component.html',
  styles: ``,
})
export class GoalCreateComponent implements OnInit {
  form!: FormGroup;
  selectedValue: string = 'income';
  categories: any[] = [];
  type: string = '';
  category: string = '';
  amount: any = '';
  tempEntries: any = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private goalsService: GoalsService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      target_amount: [, Validators.required],
      start_date: [, Validators.required],
      end_date: [, Validators.required],
    });
  }

  ngOnInit(): void {}

  onStartDateChange(date: any) {
    this.form.get('start_date')?.setValue(date.dateStr);
  }

  onEndDateChange(date: any) {
    this.form.get('end_date')?.setValue(date.dateStr);
  }

  createPlaning() {
    this.loading = true;
    const goal = this.form.value;

    this.goalsService.createGoal(goal).subscribe((res) => {
      this.router.navigate(['/goals']);
      this.loading = false;
    });
  }
}
