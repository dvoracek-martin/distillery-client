import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TemperatureHumidityData} from '../../@core/data/temperature-flow-time';
import {
    NbComponentStatus,
    NbGlobalPhysicalPosition,
    NbMediaBreakpointsService,
    NbThemeService,
    NbToastrService,
} from '@nebular/theme';
import {DistillationProcedure} from '../model/distillationProcedure';
import {DistillationProcedureService} from '../service/distillation-procedure.service';
import {OrderProfitChartSummary} from '../../@core/data/orders-profit-chart';
import {OrdersChart} from '../../@core/data/orders-chart';
import {OrdersChartComponent} from './charts/orders-chart.component';
import {takeWhile} from 'rxjs/operators';

@Component({
    selector: 'ngx-app-distillation-procedure-detail',
    templateUrl: './distillation-procedure-detail.component.html',
    styleUrls: ['./distillation-procedure-detail.component.scss',
        '../../@theme/forms/form-inputs/form-inputs.component.scss',
        '../../@theme/forms/buttons/buttons.component.scss'],
})
export class DistillationProcedureDetailComponent implements OnInit, OnDestroy {
    theme: any;
    distillationProcedure: DistillationProcedure;

    id: number;
    private alive = true;

    chartPanelSummary: OrderProfitChartSummary[];
    period: string = 'week';
    ordersChartData: OrdersChart;

    @ViewChild('ordersChart', {static: true}) ordersChart: OrdersChartComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private distillationprocedureService: DistillationProcedureService,
        private themeService: NbThemeService,
        private temperatureHumidityService: TemperatureHumidityData,
        private toastrService: NbToastrService,
        private breakpointService: NbMediaBreakpointsService,
    ) {
        this.setPeriodAndGetChartData('week');
        this.route.queryParams.subscribe(params => {
            this.id = JSON.parse(params['id']);
            this.distillationprocedureService.get(this.id).subscribe(
                val => {
                    this.distillationProcedure = val;
                },
            );
        });
        this.distillationprocedureService.getChartSummary()
            .pipe(takeWhile(() => this.alive))
            .subscribe((summary) => {
                this.chartPanelSummary = summary;
            });
    }

    gotoDistillationProcedureList() {
        this.router.navigate(['/pages/distillation-procedure-list']);
    }

    ngOnInit(): void {
    }


    private makeDistillationPhaseRemoveToast(name: string) {
        this.showToast('primary', 'Distillation phase removed!', 'The phase ' + name + ' has been removed.');
    }

    private makeDistillationPhaseAddedToast() {
        this.showToast('success', 'Distillation phase added!', 'New distillation phase has been added.');
    }

    private makeDistillationPlanUpdatedToast(name: string) {
        this.showToast('success', 'Distillation plan updated!', 'The plan ' + name + ' has been updated.');
    }

    private makeDistillationPlanErrorsToast(name: string) {
        this.showToast('danger', 'Distillation plan hasn\'t been updated because it contains errors!', 'The plan ' + name + ' hasn\'t been updated.');
    }

    private showToast(type: NbComponentStatus, title: string, body: string) {
        const config = {
            status: type,
            destroyByClick: true,
            duration: 3000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: true,
        };
        const titleContent = title ? `${title}` : '';

        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }

    setPeriodAndGetChartData(value: string): void {
        if (this.period !== value) {
            this.period = value;
        }
        this.getOrdersChartData(value);
    }

    changeTab(selectedTab) {
        // TODO adjust to selceted tab
        // console.log(selectedTab);
        // this.getOrdersChartData('month');
        this.ordersChart.resizeChart();
    }

    getOrdersChartData(period: string) {
        this.distillationprocedureService.getOrdersChartData(period)
            .pipe(takeWhile(() => this.alive))
            .subscribe(ordersChartData => {
                this.ordersChartData = ordersChartData;
            });
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
