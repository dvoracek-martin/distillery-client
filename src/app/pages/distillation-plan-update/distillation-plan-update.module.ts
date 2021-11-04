import {NgModule} from '@angular/core';

import {DistillationPlanUpdateComponent} from './distillation-plan-update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NbActionsModule, NbCardModule, NbStepperModule, NbTabsetModule} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {TemperatureDraggerComponent} from '../distillation-plan-update/temperature-dragger/temperature-dragger.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbCardModule,
    NbStepperModule,
    NbActionsModule,
    NbTabsetModule,
    ThemeModule,

  ],
  declarations: [
    DistillationPlanUpdateComponent,
    TemperatureDraggerComponent,
  ],
})
export class DistillationPlanUpdateModule {
}
