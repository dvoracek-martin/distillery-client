import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DistillationPlanService} from '../service/distillation-plan.service';
import {DistillationPlan} from '../model/distillationPlan';
import {DistillationPhase} from '../model/distillationPhase';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Temperature, TemperatureHumidityData} from '../../@core/data/temperature-flow-time';
import {takeWhile} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbThemeService, NbToastrService} from '@nebular/theme';

@Component({
    selector: 'ngx-app-plan-form',
    styleUrls: ['./distillation-plan-form.component.scss',
        '../../@theme/forms/form-inputs/form-inputs.component.scss',
        '../../@theme/forms/buttons/buttons.component.scss'],
    templateUrl: './distillation-plan-form.component.html',
})
export class DistillationPlanFormComponent implements OnInit, OnDestroy {
    temperatureData: Temperature;
    flowData: Temperature;
    timeData: Temperature;
    temperatureOff = false;
    theme: any;
    distillationPlan: DistillationPlan;
    distillationPhases: Array<DistillationPhase>;
    phaseForm: FormGroup;
    firstForm: FormGroup;
    secondForm: FormGroup;
    thirdForm: FormGroup;
    private alive = true;

    constructor(
        private themeService: NbThemeService,
        private temperatureHumidityService: TemperatureHumidityData,
        private route: ActivatedRoute,
        private router: Router,
        private distillationPlanService: DistillationPlanService,
        private fb: FormBuilder,
        private toastrService: NbToastrService) {
        this.distillationPlan = new DistillationPlan();
        this.distillationPhases = new Array<DistillationPhase>();
        this.distillationPlan.distillationPhases = this.distillationPhases;
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

    public getPhases(): FormArray {
        return this.phaseForm.get('phases') as FormArray;
    }

    newPhase(): FormGroup {
        return this.fb.group({
            name: '',
            temperature: '',
            flow: '',
            time: '',
        });
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

    addPhase() {
        this.makeDistillationPhaseAddedToast();
        this.getPhases().push(this.newPhase());
    }

    removePhase(i: number) {
        this.makeDistillationPhaseRemoveToast(this.getPhases().at(i).get('name').value);
        this.getPhases().removeAt(i);
    }

    onSubmit() {
        const distillationPhases = new Array<DistillationPhase>();
        for (const phase of this.phaseForm.get('phases')['value']) {
            const createPhase = new DistillationPhase();
            createPhase.name = phase.name;
            createPhase.temperature = phase.temperature;
            createPhase.flow = phase.flow;
            createPhase.time = phase.time;
            distillationPhases.push(createPhase);
        }
        this.distillationPlan.distillationPhases = distillationPhases;
        this.makeDistillationPlanSavedToast(this.distillationPlan.name);
        this.distillationPlanService.save(this.distillationPlan).subscribe(result => this.gotoDistillationPlanList());
    }

    gotoDistillationPlanList() {
        this.router.navigate(['/pages/plans']);
    }

    ngOnInit() {
        this.firstForm = this.fb.group({
            firstCtrl: ['', Validators.required],
        });

        this.secondForm = this.fb.group({
            secondCtrl: ['', Validators.required],
        });

        this.thirdForm = this.fb.group({
            thirdCtrl: ['', Validators.required],
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


    private makeDistillationPhaseAddedToast() {
        this.showToast('success', 'Distillation phase added!', 'New distillation phase has been added.');
    }

    private makeDistillationPhaseRemoveToast(name: string) {
        this.showToast('primary', 'Distillation phase removed!', 'The phase ' + name + ' has been removed.');
    }

    private makeDistillationPlanSavedToast(name: string) {
        this.showToast('success', 'Distillation plan saved!', 'The plan ' + name + ' has been saved.');
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
