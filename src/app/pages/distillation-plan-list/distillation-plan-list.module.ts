import {NgModule} from '@angular/core';

import {CustomRenderComponent} from './custom-render.component';
import {CustomActionRenderComponent} from './custom-action-render.component';
import {DistillationPlanListComponent} from './distillation-plan-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbActionsModule, NbCardModule, NbIconModule, NbSearchModule, NbTooltipModule} from '@nebular/theme';
import {CustomTextareaRenderComponent} from './custom-textarea-render.component';
import {
    DialogPlanPromptComponent
} from '../../@theme/modal-overlays/dialog/dialog-plan-prompt/dialog-plan-prompt.component';


const RENDERERS = [
    CustomRenderComponent,
    CustomActionRenderComponent,
    CustomTextareaRenderComponent,
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
        DistillationPlanListComponent,
        DialogPlanPromptComponent,
        RENDERERS,
    ],
})
export class DistillationPlanListModule {
}
