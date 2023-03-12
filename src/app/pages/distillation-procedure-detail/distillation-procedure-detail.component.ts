import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TemperatureHumidityData} from '../../@core/data/temperature-flow-time';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbThemeService, NbToastrService} from '@nebular/theme';
import {DistillationProcedure} from '../model/distillationProcedure';
import {DistillationProcedureService} from '../service/distillation-procedure.service';

@Component({
    selector: 'ngx-app-distillation-procedure-detail',
    templateUrl: './distillation-procedure-detail.component.html',
    styleUrls: ['./distillation-procedure-detail.component.scss',
        '../../@theme/forms/form-inputs/form-inputs.component.scss',
        '../../@theme/forms/buttons/buttons.component.scss'],
})
export class DistillationProcedureDetailComponent implements OnInit, OnDestroy {
    theme: any;
    distillationProcedure: DistillationProcedure;
    private alive = true;
    id: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private distillationprocedureService: DistillationProcedureService,
        private themeService: NbThemeService,
        private temperatureHumidityService: TemperatureHumidityData,
        private toastrService: NbToastrService,
    ) {
    }

    gotoDistillationProcedureList() {
        this.router.navigate(['/pages/distillation-procedure-list']);
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.id = JSON.parse(params['id']);
            this.distillationprocedureService.get(this.id).subscribe(
                val => {
                    this.distillationProcedure = val;
                },
            );
        });
    }

    ngOnDestroy() {
        this.alive = false;
    }

    private makeDistillationPhaseRemoveToast(name: string) {
        this.showToast('primary', 'Distillation phase removed!', 'The phase ' + name + ' has been removed.');
    }

    private makeDistillationPhaseAddedToast() {
        this.showToast('success', 'Distillation phase added!', 'New distillation phase has been added.');
    }

    private makeDistillationPlanUpdatedToast(name: string) {
        this.showToast('success', 'Distillation plan updated!', 'The plan ' + name + ' has been updated.');
    }

    private makeDistillationPlanErrorsToast(name: string) {
        this.showToast('danger', 'Distillation plan hasn\'t been updated because it contains errors!', 'The plan ' + name + ' hasn\'t been updated.');
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

