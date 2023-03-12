import {NgModule} from '@angular/core';
import {CustomActionRenderComponent} from './custom-action-render.component';
import {DistillationProcedureListComponent} from './distillation-procedure-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbActionsModule, NbCardModule, NbIconModule, NbSearchModule, NbTooltipModule} from '@nebular/theme';
import {CustomDateTimeEndRenderComponent} from './custom-date-time-end-render.component';
import {CustomDateTimeStartRenderComponent} from './custom-date-time-start-render.component';
import {
    DialogProcedurePromptComponent
} from '../../@theme/modal-overlays/dialog/dialog-procedure-prompt/dialog-procedure-prompt.component';
import {CustomEndReasonRenderComponent} from './custom-end-reason-render.component';


const RENDERERS = [
    CustomActionRenderComponent,
    CustomDateTimeEndRenderComponent,
    CustomDateTimeStartRenderComponent,
    CustomEndReasonRenderComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        NbCardModule,
        NbIconModule,
        NbActionsModule,
        NbSearchModule,
        NbTooltipModule,

    ],
    entryComponents: [
        RENDERERS,
    ],
    declarations: [
        DistillationProcedureListComponent,
        DialogProcedurePromptComponent,
        RENDERERS,
    ],
})

export class DistillationProcedureListModule {
}
