import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from '../pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {DistillationPlanService} from './service/distillation-plan.service';
import {DistillationPlanFormModule} from './distillation-plan-form/distillation-plan-form.module';
import {DistillationPlanUpdateModule} from './distillation-plan-update/distillation-plan-update.module';
import {DistillationProcessModule} from './distillation-process/distillation-process.module';
import {DistillationPlanListModule} from './distillation-plan-list/distillation-plan-list.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DistillationPlanService,
    DistillationPlanFormModule,
    DistillationPlanUpdateModule,
    DistillationProcessModule,
    DistillationPlanListModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
