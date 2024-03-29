import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DistillationProcedure} from '../model/DistillationProcedure';
import {DistillationPlan} from '../model/distillationPlan';
import {OrderProfitChartSummary} from '../../@core/data/orders-profit-chart';
import {ChartService} from './chart-service';
import {OrdersChart} from '../../@core/data/orders-chart';
import {Observable, of as observableOf} from 'rxjs';


@NgModule()
export class DistillationProcedureService {

    private readonly procedureUrl: string;

    constructor(private http: HttpClient,
                private chartService: ChartService,
    ) {
        this.procedureUrl = 'http://localhost:8080/api/procedure';
    }

    findAll() {
        return this.http.get<DistillationProcedure[]>(this.procedureUrl + '/getAll');
    }

    public delete(distillationProcedure: DistillationProcedure) {
        return this.http.delete<DistillationPlan>(this.procedureUrl + '/' + distillationProcedure.id);
    }


    public get(distillationProcedureId: number): Observable<DistillationProcedure> {
        return this.http.get<DistillationProcedure>(this.procedureUrl + '/' + distillationProcedureId);
    }

    getChartSummary(): Observable<OrderProfitChartSummary[]> {
        return observableOf(this.chartService.getSummary());
    }

    getPhaseIds(): Observable<string[]> {
        return observableOf(this.chartService.getPhaseIds());
    }

    getChartData(type: string, procedureId: number): Observable<OrdersChart> {
        this.chartService.refreshChartData(procedureId);
        return observableOf(this.chartService.getChartData(type));
    }
}
