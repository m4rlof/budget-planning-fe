import { Component, OnInit } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ActivatedRoute } from '@angular/router';
import { PlanningsService } from '../../shared/services/plannings/plannings.service';
import moment from 'moment';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { ClickOutsideDirective } from '../../shared/directive/click-outside.directive';
import { TransactionsService } from '../../shared/services/transactions/transactions.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { CategoriesService } from '../../shared/services/categories/categories.service';

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
  templateUrl: './planning-detail.component.html',
  styles: ``,
})
export class PLanningDetailComponent implements OnInit {
  public weeks: any[] = [];
  week: any;
  month: any;
  isOpen = false;
  form!: FormGroup;
  categories: any[] = [];
  monthId: any;

  constructor(
    private route: ActivatedRoute,
    private planningService: PlanningsService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {
    this.form = this.fb.group({
      category_id: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.monthId = this.route.snapshot.paramMap.get('month_id');
    this.loadPlaningWeeks(this.monthId);

    this.categoriesService.subcategories$.subscribe((res: any) => {
      console.log('res', res);
      this.categories = res?.data?.map((result: any) => {
        return {
          value: result.id,
          label: result.name,
          icon: result.icon,
        };
      });
    });
  }

  loadPlaningWeeks(monthId: any) {
    this.planningService.getPlanningWeeks(monthId).subscribe((res: any) => {
      this.week = this.findCurrentWeek(res.data);
      this.month = moment(this.week.start_date).format('MMMM');
      this.weeks = res.data;
    });
  }

  findCurrentWeek(weeks: any[]) {
    const today = moment();
    const currentWeek = weeks.find((week) => {
      const start = moment(week.start_date);
      const end = moment(week.end_date);
      return today.isBetween(start, end, undefined, '[]');
    });

    return currentWeek;
  }

  convertDate(date: any) {
    return moment(date).format('DD/MM');
  }

  nextWeek() {
    const newWeek = this.weeks.find(
      (week) => week.week_number === this.week.week_number + 1
    );

    if (newWeek) {
      this.week = newWeek;
    } else {
      console.log('Não existe próxima semana');
    }
  }

  previousWeek() {
    const prevWeek = this.weeks.find(
      (week) => week.week_number === this.week.week_number - 1
    );

    if (prevWeek) {
      this.week = prevWeek;
      console.log(this.week);
    } else {
      console.log('Não existe semana anterior');
    }
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  handleSave() {
    const categoryId = this.form.get('category_id')?.value;
    const transaction = {
      planning_month_id: Number(this.monthId),
      planning_week_id: this.week.id,
      category_id: Number(categoryId),
      amount: this.form.get('amount')?.value,
    };

    this.transactionsService.createTransaction(transaction).subscribe((res) => {
      this.loadPlaningWeeks(this.monthId);
      this.closeModal();
    });
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

  formatNumber(num: number) {
    return Number(num.toFixed(2));
  }
}
