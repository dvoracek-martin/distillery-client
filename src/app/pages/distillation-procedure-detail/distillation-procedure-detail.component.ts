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
    private alive = true;

    chartPanelSummary: OrderProfitChartSummary[];
    period: string = 'week';
    chartData: OrdersChart;

    @ViewChild('ordersChart', {static: true}) ordersChart: OrdersChartComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private distillationProcedureService: DistillationProcedureService,
    ) {
        this.setPeriodAndGetChartData('temperature');
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
    }

    setPeriodAndGetChartData(value: string): void {
        if (this.period !== value) {
            this.period = value;
        }
        this.getChartData(value);
    }

    changeTab(selectedTab) {
        this.getChartData(selectedTab.tabId);
        this.ordersChart.resizeChart();
    }

    getChartData(type: string) {
        this.route.queryParams.subscribe(params => {
            this.id = JSON.parse(params['id']);
            this.distillationProcedureService.getChartData(type, this.id)
                .pipe(takeWhile(() => this.alive))
                .subscribe(chartData => {
                    this.chartData = chartData;
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
