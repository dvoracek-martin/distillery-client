import {Component, OnInit} from '@angular/core';
import {DistillationPlanService} from '../service/distillation-plan.service';
import {NavigationExtras, Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {DistillationProcedureService} from '../service/distillation-procedure.service';
import {DistillationProcedure} from '../model/DistillationProcedure';
import {CustomDateTimeEndRenderComponent} from './custom-date-time-end-render.component';
import {CustomDateTimeStartRenderComponent} from './custom-date-time-start-render.component';
import {CustomActionRenderComponent} from './custom-action-render.component';
import {
    DialogProcedurePromptComponent
} from '../../@theme/modal-overlays/dialog/dialog-procedure-prompt/dialog-procedure-prompt.component';
import {CustomEndReasonRenderComponent} from './custom-end-reason-render.component';

@Component({
    selector: 'ngx-app-distillation-list',
    templateUrl: './distillation-procedure-list.component.html',
    styleUrls: ['../../@theme/tables/smart-table/smart-table.component.scss',
        '../../@theme/forms/buttons/buttons.component.scss'],
})
export class DistillationProcedureListComponent implements OnInit {

    distillationProcedures: DistillationProcedure[];
    source: LocalDataSource = new LocalDataSource();
    settings = {
        hideSubHeader: true,
        actions: false,
        header: {
            title: 'Distillation procedures',
        },
        columns: {
            distillationPlanName: {
                title: 'Distillation plan name',
                type: 'string',
            },
            attemptNumber: {
                title: 'Attempt #',
                type: 'number',
            },
            distillationTimeStart: {
                title: 'Distillation start time',
                type: 'custom',
                renderComponent: CustomDateTimeStartRenderComponent,
            },
            distillationTimeEnd: {
                title: 'Distillation end time',
                type: 'custom',
                renderComponent: CustomDateTimeEndRenderComponent,
            },
            distillationEndReason: {
                title: 'Distillation end type',
                type: 'custom',
                renderComponent: CustomEndReasonRenderComponent,
            },
            actions: {
                title: 'Actions',
                type: 'custom',
                renderComponent: CustomActionRenderComponent,
            },
        },
    };

    constructor(private distillationPlanService: DistillationPlanService,
                private distillationProcedureService: DistillationProcedureService,
                private router: Router,
                private toastrService: NbToastrService,
                private dialogService: NbDialogService,
    ) {
    }


    public navigateToDistillationProcedureDetail(distillationProcedure: DistillationProcedure) {
        let navigationExtras: NavigationExtras;
        navigationExtras = {
            queryParams: {
                'id': JSON.stringify(distillationProcedure.id),
            },
        };
        this.router.navigate(['/pages/procedure-detail'], navigationExtras);
    }

    ngOnInit() {
        this.distillationProcedureService.findAll().subscribe(data => {
            this.distillationProcedures = data;
            this.source.load(data);
        });
    }

    openDeleteDialog(distillationProcedure: DistillationProcedure) {
        this.dialogService.open(DialogProcedurePromptComponent)
            .onClose.subscribe(state => {
            if (state === ('success')) {
                this.distillationProcedureService.delete(distillationProcedure).subscribe(
                    result => this.distillationProcedureService.findAll().subscribe(data => {
                        this.distillationProcedures = data;
                        this.source.load(data).then(r => this.makeDistillationPlanRemovedToast(distillationProcedure.distillationPlanName, distillationProcedure.attemptNumber));
                    }));
            }
        });

    }

    private makeDistillationPlanRemovedToast(name: string, attemptNumber: number) {
        this.showToast('danger', 'Distillation procedure log removed!', 'The attempt #' + attemptNumber + ' for plan ' + name + ' has been removed.');
    }

    private showToast(type: NbComponentStatus, title: string, body: string) {
        const config = {
            status: type,
            destroyByClick: true,
            duration: 3000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: true,
        };
        const titleContent = title ? `${title}` : '';

        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }
}
