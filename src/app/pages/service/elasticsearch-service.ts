import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DistillationProcessDataFromRaspiDto} from '../model/distillationProcessDataFromRaspiDto';

@NgModule()
export class ElasticsearchService {

    private readonly procedureUrl: string;

    constructor(private http: HttpClient) {
        this.procedureUrl = 'http://localhost:8080/api/procedure';
    }

    public get(distillationProcedureId: number): Observable<DistillationProcessDataFromRaspiDto[]> {
        return this.http.get<DistillationProcessDataFromRaspiDto[]>(this.procedureUrl + '/es/' + distillationProcedureId);
    }
}
