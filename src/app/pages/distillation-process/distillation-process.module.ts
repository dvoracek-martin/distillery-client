import {NgModule} from '@angular/core';

import {DistillationProcessComponent} from './distillation-process.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NbCardModule, NbCheckboxModule, NbIconModule, NbProgressBarModule, NbSelectModule} from '@nebular/theme';
import {NgxEchartsCoreModule} from 'ngx-echarts/core';
import {ThemeModule} from '../../@theme/theme.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbProgressBarModule,
    NgxEchartsCoreModule,
    NbCheckboxModule,
    ThemeModule,
    NbSelectModule,
  ],
  declarations: [
    DistillationProcessComponent,
  ],
})
export class DistillationProcessModule {
}
