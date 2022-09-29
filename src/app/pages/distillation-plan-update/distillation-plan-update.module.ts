import {NgModule} from '@angular/core';

import {DistillationPlanUpdateComponent} from './distillation-plan-update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
    NbActionsModule,
    NbCardModule, NbIconModule, NbLayoutModule,
    NbRadioModule,
    NbSidebarModule,
    NbStepperModule,
    NbTabsetModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {MiscellaneousModule} from '../miscellaneous/miscellaneous.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NbCardModule,
        NbStepperModule,
        ThemeModule,
        NbRadioModule,
        NbTabsetModule,
        NbSidebarModule,
        NbLayoutModule,
        NbIconModule,
        NbActionsModule,
        MiscellaneousModule,
    ],
    declarations: [
        DistillationPlanUpdateComponent,
    ],
})
export class DistillationPlanUpdateModule {
}
