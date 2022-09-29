import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DistillationPlan} from '../model/distillationPlan';
import {Observable} from 'rxjs/Observable';

@NgModule()
export class DistillationPlanService {

  private readonly plansUrl: string;

  constructor(private http: HttpClient) {
    this.plansUrl = 'http://localhost:8080/api/plan';
  }

  public findAll(): Observable<DistillationPlan[]> {
    return this.http.get<DistillationPlan[]>(this.plansUrl + '/getAll');
  }

  public get(distillationPlanId: number): Observable<DistillationPlan> {
    return this.http.get<DistillationPlan>(this.plansUrl + '/' + distillationPlanId);
  }

  public start(distillationPlan: DistillationPlan): Observable<DistillationPlan[]> {
    return this.http.post<DistillationPlan[]>(this.plansUrl + '/start', distillationPlan);
  }

  public save(distillationPlan: DistillationPlan) {
    return this.http.post<DistillationPlan>(this.plansUrl, distillationPlan);
  }

  public update(distillationPlan: DistillationPlan) {
    return this.http.put<DistillationPlan>(this.plansUrl + '/' + distillationPlan.id, distillationPlan);
  }

  public delete(distillationPlan: DistillationPlan) {
    return this.http.delete<DistillationPlan>(this.plansUrl + '/' + distillationPlan.id);
  }

  public terminate(distillationPlan: DistillationPlan) {
    return this.http.post<DistillationPlan>(this.plansUrl + '/terminate', distillationPlan);
  }
}
