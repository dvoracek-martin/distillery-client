import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DistillationPlan} from '../model/distillationPlan';
import {Observable} from 'rxjs/Observable';

@NgModule()
export class DistillationPlanService {

    private readonly planUrl: string;

    constructor(private http: HttpClient) {
        this.planUrl = 'http://localhost:8080/api/plan';
    }

    public findAll(): Observable<DistillationPlan[]> {
        return this.http.get<DistillationPlan[]>(this.planUrl + '/getAll');
    }

    public get(distillationPlanId: number): Observable<DistillationPlan> {
        return this.http.get<DistillationPlan>(this.planUrl + '/' + distillationPlanId);
    }

    public start(distillationPlan: DistillationPlan): Observable<DistillationPlan[]> {
        return this.http.post<DistillationPlan[]>(this.planUrl + '/start', distillationPlan);
    }

    public save(distillationPlan: DistillationPlan) {
        return this.http.post<DistillationPlan>(this.planUrl, distillationPlan);
    }

    public update(distillationPlan: DistillationPlan) {
        return this.http.put<DistillationPlan>(this.planUrl + '/' + distillationPlan.id, distillationPlan);
    }

    public delete(distillationPlan: DistillationPlan) {
        return this.http.delete<DistillationPlan>(this.planUrl + '/' + distillationPlan.id);
    }

    public terminate(distillationPlan: DistillationPlan) {
        return this.http.post<DistillationPlan>(this.planUrl + '/terminate', distillationPlan);
    }

    public terminateByUser(distillationPlan: DistillationPlan) {
        return this.http.post<DistillationPlan>(this.planUrl + '/terminate-by-user', distillationPlan);
    }

    public jumpToNextPhase(distillationPlan: DistillationPlan): Observable<DistillationPlan[]> {
        return this.http.post<DistillationPlan[]>(this.planUrl + '/next', distillationPlan);
    }
}
