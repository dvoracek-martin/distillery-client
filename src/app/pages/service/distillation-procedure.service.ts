import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DistillationProcedure} from '../model/DistillationProcedure';
import {DistillationPlan} from '../model/distillationPlan';
import {Observable} from 'rxjs/Observable';

@NgModule()
export class DistillationProcedureService {
    private readonly procedureUrl: string;

    constructor(private http: HttpClient) {
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
}
