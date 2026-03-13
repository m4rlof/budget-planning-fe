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
import { CategoriesService } from '../../shared/services/categories/categories.service';
import { PlanningsService } from '../../shared/services/plannings/plannings.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Router } from '@angular/router';

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
  templateUrl: './planning-create.component.html',
  styles: ``,
})
export class PLanningCreateComponent implements OnInit {
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
    private categoriesService: CategoriesService,
    private planningService: PlanningsService,
    private router: Router
  ) {
    this.form = this.fb.group({
      planning_date: ['', Validators.required],
      entries: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoriesService.subcategories$.subscribe((res: any) => {
      this.categories = res.data.map((result: any) => {
        return {
          value: result.id,
          label: result.name,
          icon: result.icon,
        };
      });
    });
  }

  onDateChange(date: any) {
    const formattedDate = moment(date.dateStr)?.format('YYYY-MM-DD');
    this.form.get('planning_date')?.setValue(formattedDate);
  }

  addEntry() {
    const entry = {
      type: this.type,
      category: this.category,
      amount: this.amount,
    };
    this.tempEntries.push(entry);
    this.form.get('entries')?.setValue(this.tempEntries);
    this.type = '';
    this.category = '';
    this.amount = '';
  }

  createPlaning() {
    this.loading = true;
    const planning = this.form.value;
    this.planningService.createPlanning(planning).subscribe((res) => {
      this.router.navigate(['/plannings']);
      this.loading = false;
    });
  }

  entryDisabled(): boolean {
    return !this.amount || !this.category || !this.type;
  }

  planningDisabled(): boolean {
    return (
      !this.form.get('entries')?.valid || !this.form.get('planning_date')?.valid
    );
  }

  getCategory(id: any) {
    const category = this.categories.find((item: any) => {
      return item.value == id;
    });

    return `${category.icon} ${this.normalizestr(category!.label)}`;
  }

  normalizestr(str: string) {
    return str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
