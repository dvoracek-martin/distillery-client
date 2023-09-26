import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    chartPanelSummary: OrderProfitChartSummary[];
    period: string = 'week';
    temperatureHeader = 'temperatureHeader';
    flowHeader = 'flowHeader';
    weightHeader = 'weightHeader';
    alcHeader = 'alcHeader';
    chartData: OrdersChart;
    chartDataTemperature: OrdersChart;
    chartDataFlow: OrdersChart;
    chartDataWeight: OrdersChart;
    chartDataAlc: OrdersChart;
    @ViewChild('ordersChart', {static: true}) ordersChart: OrdersChartComponent;
    private alive = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private distillationProcedureService: DistillationProcedureService,
    ) {
        this.distillationProcedureService.getChartSummary()
            .pipe(takeWhile(() => this.alive))
            .subscribe((summary) => {
                this.chartPanelSummary = summary;
            });


        this.getChartData('temperature');
        this.getChartData('flow');
        this.getChartData('weight');
        this.getChartData('alc');


        this.route.queryParams.subscribe(params => {
            this.id = JSON.parse(params['id']);
            this.distillationProcedureService.get(this.id).subscribe(
                val => {
                    this.distillationProcedure = val;
                },
            );
            this.distillationProcedureService.getChartSummary()
                .pipe(takeWhile(() => this.alive))
                .subscribe((summary) => {
                    this.chartPanelSummary = summary;
                });
        });
    }

    gotoDistillationProcedureList() {
        this.router.navigate(['/pages/distillation-procedure-list']);
    }

    ngOnInit(): void {
        this.getChartData('temperature');
        this.getChartData('flow');
        this.getChartData('weight');
        this.getChartData('alc');
        this.ordersChart.resizeChart();
    }

    getChartData(type: string) {
        this.route.queryParams.subscribe(params => {
            this.id = JSON.parse(params['id']);
            this.distillationProcedureService.getChartData(type, this.id)
                .pipe(takeWhile(() => this.alive))
                .subscribe(chartData => {
                    this.chartData = chartData;
                    if (type === 'temperature') {
                        this.chartDataTemperature = this.chartData;
                    } else if (type === 'flow') {
                        this.chartDataFlow = this.chartData;
                    } else if (type === 'weight') {
                        this.chartDataWeight = this.chartData;
                    } else if (type === 'alc') {
                        this.chartDataAlc = this.chartData;
                    }
                    this.distillationProcedureService.getChartSummary()
                        .pipe(takeWhile(() => this.alive))
                        .subscribe((summary) => {
                            this.chartPanelSummary = summary;
                        });
                });
        });
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
