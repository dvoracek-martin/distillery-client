import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
    NbActionsModule,
    NbCardModule,
    NbIconModule,
    NbLayoutModule,
    NbRadioModule,
    NbSelectModule,
    NbSidebarModule,
    NbStepperModule,
    NbTabsetModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {MiscellaneousModule} from '../miscellaneous/miscellaneous.module';
import {DistillationProcedureDetailComponent} from './distillation-procedure-detail.component';
import {ChartPanelHeaderComponent} from './chart-panel-header/chart-panel-header.component';
import {OrdersChartComponent} from './charts/orders-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {NgxEchartsModule} from 'ngx-echarts';
import {ChartModule} from 'angular2-chartjs';
import {ECommerceLegendChartComponent} from './legend-chart/legend-chart.component';
import {ChartPanelSummaryComponent} from './chart-panel-summary/chart-panel-summary.component';

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
        MiscellaneousModule,
        NbSelectModule,
        NgxEchartsModule,
        NgxChartsModule,
        ChartModule,
    ],
    declarations: [
        DistillationProcedureDetailComponent,
        ChartPanelHeaderComponent,
        OrdersChartComponent,
        ECommerceLegendChartComponent,
        ChartPanelSummaryComponent,
    ],
})
export class DistillationProcedureDetailModule {
}
