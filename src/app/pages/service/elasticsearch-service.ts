import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DistillationPlan} from '../model/distillationPlan';

@NgModule()
export class ElasticsearchService {

    private readonly planUrl: string;

    constructor(private http: HttpClient) {
        this.planUrl = 'http://localhost:8080/api/procedure';
    }

    public get(distillationProcedureId: number): Observable<DistillationPlan> {
        console.log('tu ano' + this.planUrl + '/es/' + distillationProcedureId );
        return this.http.get<DistillationPlan>(this.planUrl + '/es/' + distillationProcedureId);
    }
}
