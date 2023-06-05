import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DistillationProcedure} from '../model/DistillationProcedure';
import {DistillationPlan} from '../model/distillationPlan';
import {OrderProfitChartSummary} from '../../@core/data/orders-profit-chart';
import {Observable} from 'rxjs/Rx';
import {ChartService} from './chart-service';
import {OrdersChart} from '../../@core/data/orders-chart';

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
        return Observable.of(this.chartService.getSummary());
    }

    getPhaseIds(): Observable<string[]> {
        return Observable.of(this.chartService.getPhaseIds());
    }

    getChartData(type: string, procedureId: number): Observable<OrdersChart> {
        this.chartService.refreshChartData(procedureId);
        return Observable.of(this.chartService.getChartData(type));
    }
}
