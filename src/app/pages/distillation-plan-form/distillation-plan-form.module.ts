import {NgModule} from '@angular/core';

import {DistillationPlanFormComponent} from './distillation-plan-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  NbActionsModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbRadioModule,
  NbSidebarModule,
  NbStepperModule,
  NbTabsetModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {TemperatureDraggerComponent} from './temperature-dragger/temperature-dragger.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbCardModule,
    NbStepperModule,
    ThemeModule,
    NbRadioModule,
    NbTabsetModule,
    NbSidebarModule,
    NbLayoutModule,
    NbIconModule,
    NbActionsModule,

  ],
  declarations: [
    DistillationPlanFormComponent,
    TemperatureDraggerComponent,
  ],
})
export class DistillationPlanFormModule {
}

