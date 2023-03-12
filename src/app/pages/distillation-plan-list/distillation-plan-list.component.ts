import {Component, OnInit} from '@angular/core';
import {DistillationPlan} from '../model/distillationPlan';
import {DistillationPlanService} from '../service/distillation-plan.service';
import {NavigationExtras, Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {CustomRenderComponent} from './custom-render.component';
import {CustomActionRenderComponent} from './custom-action-render.component';
import {CustomTextareaRenderComponent} from './custom-textarea-render.component';
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {
    DialogPlanPromptComponent
} from '../../@theme/modal-overlays/dialog/dialog-plan-prompt/dialog-plan-prompt.component';

@Component({
    selector: 'ngx-app-distillation-list',
    templateUrl: './distillation-plan-list.component.html',
    styleUrls: ['../../@theme/tables/smart-table/smart-table.component.scss',
        '../../@theme/forms/buttons/buttons.component.scss'],
})
export class DistillationPlanListComponent implements OnInit {

    distillationPlans: DistillationPlan[];
    source: LocalDataSource = new LocalDataSource();
    settings = {
        hideSubHeader: true,
        actions: false,
        header: {
            title: 'Distillation plans',
        },
        columns: {
            name: {
                title: 'Name',
                type: 'string',
            },
            description: {
                title: 'Description',
                type: 'custom',
                renderComponent: CustomTextareaRenderComponent,
            },
            distillationPhases: {
                title: 'Phases',
                type: 'custom',
                renderComponent: CustomRenderComponent,
            },
            actions: {
                title: 'Actions',
                type: 'custom',
                renderComponent: CustomActionRenderComponent,
            },
        },
    };

    constructor(private distillationPlanService: DistillationPlanService,
                private router: Router,
                private toastrService: NbToastrService,
                private dialogService: NbDialogService,
    ) {
    }

    startDistillationPlan(distillationPlan: DistillationPlan) {
        this.distillationPlanService.start(distillationPlan).subscribe(result => this.router.navigate(['/pages/distillation-process']));
    }

    public navigateToEditDistillationPlan(distillationPlan: DistillationPlan) {
        let navigationExtras: NavigationExtras;
        navigationExtras = {
            queryParams: {
                'id': JSON.stringify(distillationPlan.id),
            },
        };
        this.router.navigate(['/pages/update'], navigationExtras);
    }

    ngOnInit() {
        this.distillationPlanService.findAll().subscribe(data => {
            this.distillationPlans = data;
            this.source.load(data);
        });
    }

    createDistillationPlan() {
        this.router.navigate(['/pages/add']);
    }

    openDeleteDialog(distillationPlan: DistillationPlan) {
        this.dialogService.open(DialogPlanPromptComponent)
            .onClose.subscribe(state => {
            if (state === ('success')) {
                this.distillationPlanService.delete(distillationPlan).subscribe(
                    result => this.distillationPlanService.findAll().subscribe(data => {
                        this.distillationPlans = data;
                        this.source.load(data).then(r => this.makeDistillationPlanRemovedToast(distillationPlan.name));
                    }));
            }
        });

    }

    private makeDistillationPlanRemovedToast(name: string) {
        this.showToast('danger', 'Distillation plan removed!', 'The plan ' + name + ' has been removed.');
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
