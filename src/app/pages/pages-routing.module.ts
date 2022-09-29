import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from '../pages.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {DistillationPlanFormComponent} from './distillation-plan-form/distillation-plan-form.component';
import {DistillationPlanUpdateComponent} from './distillation-plan-update/distillation-plan-update.component';
import {DistillationProcessComponent} from './distillation-process/distillation-process.component';
import {DistillationPlanListComponent} from './distillation-plan-list/distillation-plan-list.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'plans',
      component: DistillationPlanListComponent,
    },
    {
      path: 'add',
      component: DistillationPlanFormComponent,
    },
    {
      path: 'update',
      component: DistillationPlanUpdateComponent,
    },
    {
      path: 'distillation-process',
      component: DistillationProcessComponent,
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'add',
      loadChildren: () => import('./distillation-plan-form/distillation-plan-form.component')
        .then(m => m.DistillationPlanFormComponent),
    },
    {
      path: '',
      redirectTo: 'plans',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
