import { Component, OnInit } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { Router } from '@angular/router';
import { PlanningsService } from '../../shared/services/plannings/plannings.service';
import moment from 'moment';
import { SafeHtmlPipe } from '../../shared/pipe/safe-html.pipe';
import { BadgeComponent } from '../../shared/components/ui/badge/badge.component';
import { InsightsService } from '../../shared/services/insights/insights.service';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { CategoriesService } from '../../shared/services/categories/categories.service';
import { LabelComponent } from '../../shared/components/form/label/label.component';

@Component({
  selector: 'app-insights',
  imports: [SafeHtmlPipe, BadgeComponent, SelectComponent, LabelComponent],
  templateUrl: './insights.component.html',
  styles: ``,
})
export class InsightsComponent implements OnInit {
  public insight!: any;
  public icons = {
    groupIcon: `<svg width="1em" height="1em" viewBox="0 0 25 24" fill="none"
            xmlns="http://www.w3.org/2000/svg" class="size-6">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.4164 2.79175C13.4164 2.37753 13.0806 2.04175 12.6664 2.04175C12.2522 2.04175 11.9164 2.37753 11.9164 2.79175V4.39876C9.94768 4.67329 8.43237 6.36366 8.43237 8.40795C8.43237 10.0954 9.47908 11.6058 11.0591 12.1984L13.7474 13.2066C14.7419 13.5795 15.4008 14.5303 15.4008 15.5925C15.4008 16.9998 14.2599 18.1407 12.8526 18.1407H11.7957C10.7666 18.1407 9.93237 17.3064 9.93237 16.2773C9.93237 15.8631 9.59659 15.5273 9.18237 15.5273C8.76816 15.5273 8.43237 15.8631 8.43237 16.2773C8.43237 18.1348 9.9382 19.6407 11.7957 19.6407H11.9164V21.2083C11.9164 21.6225 12.2522 21.9583 12.6664 21.9583C13.0806 21.9583 13.4164 21.6225 13.4164 21.2083V19.6017C15.3853 19.3274 16.9008 17.6369 16.9008 15.5925C16.9008 13.905 15.8541 12.3946 14.2741 11.8021L11.5858 10.7939C10.5912 10.4209 9.93237 9.47013 9.93237 8.40795C9.93237 7.00063 11.0732 5.85976 12.4806 5.85976H13.5374C14.5665 5.85976 15.4008 6.69401 15.4008 7.72311C15.4008 8.13732 15.7366 8.47311 16.1508 8.47311C16.565 8.47311 16.9008 8.13732 16.9008 7.72311C16.9008 5.86558 15.395 4.35976 13.5374 4.35976H13.4164V2.79175Z"
              fill="currentColor"></path>
`,
    flame: `<svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" class="size-6" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.6606 2.82184C11.4635 2.54595 11.1057 2.43665 10.7881 2.55524C8.15616 3.53774 3.58398 7.45504 3.58398 14.0644C3.58398 18.7251 7.36223 22.5034 12.0229 22.5034C16.6836 22.5034 20.4619 18.7251 20.4619 14.0644C20.4619 10.7728 19.3238 8.14527 17.8642 6.22269C17.617 5.89696 17.1543 5.82937 16.8242 6.07075L14.9574 7.43574L11.6606 2.82184ZM5.08398 14.0644C5.08398 8.632 8.56732 5.29624 10.7932 4.18806L14.1777 8.92474C14.2942 9.08774 14.471 9.19737 14.6688 9.22919C14.8666 9.26101 15.0689 9.21238 15.2306 9.09414L17.0956 7.73053C18.1704 9.35623 18.9619 11.4698 18.9619 14.0644C18.9619 16.5018 17.7052 18.6456 15.8045 19.8833C15.9707 19.4414 16.0616 18.9625 16.0616 18.4624C16.0616 17.713 15.7961 17.0023 15.4521 16.3888C15.1057 15.771 14.6538 15.2061 14.2189 14.7349C13.782 14.2615 13.3476 13.8671 13.0235 13.5915C12.8609 13.4532 12.7246 13.3437 12.6278 13.2679C12.5794 13.2299 12.5408 13.2003 12.5136 13.1797L12.4815 13.1556L12.4722 13.1487L12.4683 13.1458C12.4682 13.1457 12.4676 13.1453 12.024 13.7501L12.4683 13.1458C12.2043 12.9521 11.8444 12.9516 11.5803 13.1453L12.024 13.7501C11.5803 13.1453 11.5805 13.1452 11.5803 13.1453L11.5787 13.1466L11.5758 13.1487L11.5665 13.1556L11.5344 13.1797C11.5072 13.2003 11.4685 13.2299 11.4201 13.2679C11.3233 13.3437 11.1871 13.4532 11.0245 13.5915C10.7003 13.8671 10.2659 14.2615 9.82901 14.7349C9.39416 15.2061 8.9423 15.771 8.59586 16.3888C8.25183 17.0023 7.98633 17.713 7.98633 18.4624C7.98633 18.9632 8.0775 19.4427 8.24414 19.8852C6.34185 18.6477 5.08398 16.503 5.08398 14.0644ZM10.9313 15.7523C11.3163 15.3351 11.7038 14.9828 11.9961 14.7343L12.024 14.7106L12.0519 14.7343C12.3442 14.9828 12.7317 15.3351 13.1167 15.7523C13.5037 16.1716 13.8738 16.641 14.1438 17.1225C14.4162 17.6082 14.5616 18.0616 14.5616 18.4624C14.5616 19.8639 13.4255 21.0001 12.024 21.0001C10.6225 21.0001 9.48633 19.8639 9.48633 18.4624C9.48633 18.0616 9.63178 17.6082 9.90418 17.1225C10.1742 16.641 10.5442 16.1716 10.9313 15.7523Z" fill="#343C54"></path>
</svg>`,
  };
  categories: any[] = [];

  constructor(private insightService: InsightsService) {}

  ngOnInit(): void {
    this.insightService.getCurrentMonthSaving().subscribe((res: any) => {
      this.insight = res.data;
    });

    this.insightService.getMostExpensiveCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  normalizestr(str: string) {
    return str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
