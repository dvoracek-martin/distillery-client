import {Component, OnDestroy, OnInit} from '@angular/core';
import {DistillationPlan} from '../model/distillationPlan';
import {DistillationPhase} from '../model/distillationPhase';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DistillationPlanService} from '../service/distillation-plan.service';
import {Temperature, TemperatureHumidityData} from '../../@core/data/temperature-flow-time';
import {takeWhile} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbThemeService, NbToastrService} from '@nebular/theme';

@Component({
    selector: 'ngx-app-distillation-plan-update',
    templateUrl: './distillation-plan-update.component.html',
    styleUrls: ['./distillation-plan-update.component.scss',
        '../../@theme/forms/form-inputs/form-inputs.component.scss',
        '../../@theme/forms/buttons/buttons.component.scss'],
})
export class DistillationPlanUpdateComponent implements OnInit, OnDestroy {
    temperatureData: Temperature;
    flowData: Temperature;
    timeData: Temperature;
    temperatureOff = false;
    theme: any;
    distillationPlan: DistillationPlan;
    phaseForm: FormGroup;
    firstForm: FormGroup;
    secondForm: FormGroup;
    thirdForm: FormGroup;
    distillationPlanToEdit: DistillationPlan;
    id: number;
    private alive = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private distillationPlanService: DistillationPlanService,
        private fb: FormBuilder,
        private themeService: NbThemeService,
        private temperatureHumidityService: TemperatureHumidityData,
        private toastrService: NbToastrService,
    ) {
        this.distillationPlan = new DistillationPlan();
        this.distillationPlan.distillationPhases = new Array<DistillationPhase>();
        this.phaseForm = this.fb.group({
            name: '',
            phases: this.fb.array([]),
        });
        this.themeService.getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe(config => {
                this.theme = config.variables.temperature;
            });

        forkJoin(
            this.temperatureHumidityService.getTemperatureData(),
            this.temperatureHumidityService.getFlowData(),
            this.temperatureHumidityService.getTimeData(),
        )
            .subscribe(([temperatureData, flowData, timeData]: [Temperature, Temperature, Temperature]) => {
                this.temperatureData = temperatureData;
                this.flowData = flowData;
                this.timeData = timeData;
            });

    }

    getPhases(): FormArray {
        return this.phaseForm.get('phases') as FormArray;
    }

    newPhase(distillationPhase: DistillationPhase): FormGroup {
        return this.fb.group({
            id: distillationPhase.id,
            name: distillationPhase.name,
            temperature: distillationPhase.temperature,
            flow: distillationPhase.flow,
            time: distillationPhase.time / 60000,
        });
    }

    newPhaseEmpty(): FormGroup {
        return this.fb.group({
            id: '',
            name: '',
            temperature: '',
            flow: '',
            time: '',
        });
    }

    addPhaseEmpty() {
        this.makeDistillationPhaseAddedToast();
        this.getPhases().push(this.newPhaseEmpty());
    }

    addPhase(distillationPhase: DistillationPhase) {
        this.getPhases().push(this.newPhase(distillationPhase));
    }

    removePhase(i: number) {
        this.makeDistillationPhaseRemoveToast(this.getPhases().at(i).get('name').value);
        this.getPhases().removeAt(i);
    }


    adjustName(event, i) {
        this.getPhases().at(i).get('name').setValue(event.target.value);
    }


    adjustTemperature(i: number, value: number) {
        this.getPhases().at(i).get('temperature').setValue(value);
    }

    adjustFlow(i: number, value: number) {
        this.getPhases().at(i).get('flow').setValue(value);
    }

    adjustTime(i: number, value: number) {
        this.getPhases().at(i).get('time').setValue(value);
    }

    onSubmit() {
        const distillationPhases = new Array<DistillationPhase>();
        for (const phase of this.phaseForm.get('phases')['value']) {
            const updatePhase = new DistillationPhase();
            updatePhase.id = phase.id;
            updatePhase.name = phase.name;
            updatePhase.temperature = phase.temperature;
            updatePhase.flow = phase.flow;
            updatePhase.time = phase.time;
            distillationPhases.push(updatePhase);
        }
        for (const phase of distillationPhases) {
            if (phase.name === '' || phase.time < 1 || phase.flow < 1 || phase.temperature < 1) {
                this.makeDistillationPlanErrorsToast(this.distillationPlanToEdit.name);
                return;
            }
        }

        this.distillationPlanToEdit.distillationPhases = distillationPhases;

        this.distillationPlanService.update(this.distillationPlanToEdit).subscribe(
            result => {
                this.makeDistillationPlanUpdatedToast(this.distillationPlanToEdit.name);
                this.gotoDistillationPlanList();
            });
    }

    gotoDistillationPlanList() {
        this.router.navigate(['/pages/plans']);
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.id = JSON.parse(params['id']);
            this.distillationPlanService.get(this.id).subscribe(
                val => {
                    this.distillationPlanToEdit = val;
                    let distillationPhases;
                    distillationPhases = this.distillationPlanToEdit.distillationPhases;
                    for (const distillationPhase of distillationPhases) {
                        this.addPhase(distillationPhase);
                    }
                    this.firstForm = this.fb.group({
                        firstCtrl: ['', Validators.required],
                    });

                    this.secondForm = this.fb.group({
                        secondCtrl: ['', Validators.required],
                    });

                    this.thirdForm = this.fb.group({
                        thirdCtrl: ['', Validators.required],
                    });
                },
            );
        });
    }

    ngOnDestroy() {
        this.alive = false;
    }

    onFirstSubmit() {
        this.firstForm.markAsDirty();
    }

    onSecondSubmit() {
        this.secondForm.markAsDirty();
    }

    onThirdSubmit() {
        this.thirdForm.markAsDirty();
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

