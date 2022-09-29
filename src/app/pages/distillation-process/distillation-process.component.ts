import {Component, OnInit} from '@angular/core';
import {DistillationPlan} from '../model/distillationPlan';
import {DistillationProcessDataToFrontendDto} from '../model/distillationProcessDataToFrontendDto';
import {DistillationPlanService} from '../service/distillation-plan.service';
import {DistillationPhaseService} from '../service/distillation-phase.service';
import {Router} from '@angular/router';
import 'reflect-metadata';

import {
    NbComponentStatus,
    NbDialogService,
    NbGlobalPhysicalPosition,
    NbGlobalPosition,
    NbToastrService,
} from '@nebular/theme';
import {WebSocketAPI} from './WebSocketAPI';

@Component({
    selector: 'ngx-app-distillation-process',
    templateUrl: './distillation-process.component.html',
    styleUrls: ['./distillation-process.component.css',
        '../../@theme/extra-components/progress-bar/interactive-progress-bar/interactive-progress-bar.component.scss'
        , '../../@theme/e-commerce/profit-card/profit-card.component.scss'
        , '../../@theme/modal-overlays/dialog/dialog.component.scss'],
})
export class DistillationProcessComponent implements OnInit {
    distillationProcessDataToFrontendDto: DistillationProcessDataToFrontendDto;
    toastHasIcon = true;
    toastIndex = 1;
    interval: any;
    isPhaseLoaded: boolean;
    timeElapsedMinutes: number;
    timeElapsedSeconds: number;
    progress = 0;
    flipped = false;
    title = 'Distillation in progress';
    webSocketAPI: WebSocketAPI;
    name: string;
    distillationFinished: boolean;
    elapsed: number;

    constructor(
        private toastrService: NbToastrService,
        private dialogService: NbDialogService,
        private router: Router,
        private distillationPlanService: DistillationPlanService,
        private distillationPhaseService: DistillationPhaseService,
    ) {
        this.isPhaseLoaded = false;
    }

    get status() {
        if (this.progress <= 25) {
            return 'danger';
        } else if (this.progress <= 50) {
            return 'warning';
        } else if (this.progress <= 75) {
            return 'info';
        } else {
            return 'success';
        }
    }

    connect() {
        this.webSocketAPI._connect();
    }

    disconnect() {
        this.webSocketAPI._disconnect();
    }

    sendMessage() {
        this.webSocketAPI._send('distillery-fromBackend');
    }

    handleMessage(message) {
        const map = new Map(Object.entries(JSON.parse(message)));
        if (map.get('terminated') === true && this.distillationProcessDataToFrontendDto.distillationPlanDto.name != null) {
            this.distillationFinished = true;
            clearInterval(this.interval);
            this.terminateDistillationProcess();
        }
        this.distillationProcessDataToFrontendDto = JSON.parse(message);
        this.timeElapsedMinutes = this.distillationProcessDataToFrontendDto.timeElapsedInMillis / 1000 / 60;
        this.timeElapsedSeconds = this.distillationProcessDataToFrontendDto.timeElapsedInMillis / 1000 % 60;
        this.progress = Math.round(100 / (this.distillationProcessDataToFrontendDto.currentDistillationPhaseDto.time / this.distillationProcessDataToFrontendDto.timeElapsedInMillis));
        this.isPhaseLoaded = true;
    }

    ngOnInit(): void {
        this.isPhaseLoaded = false;
        this.distillationFinished = false;
        this.distillationProcessDataToFrontendDto = new DistillationProcessDataToFrontendDto();
        this.webSocketAPI = new WebSocketAPI(this);
        this.connect();
        const timeStarted: number = Date.now();
        this.interval = setInterval(() => {
            this.refreshData(timeStarted);
        }, 3000);
    }

    refreshData(timeStarted: number) {
        this.elapsed = Date.now() - timeStarted;
        if (this.elapsed > 5000 && this.distillationProcessDataToFrontendDto.distillationPlanDto === undefined) {
            clearInterval(this.interval);
            this.makeNoPlanInProgressToastAndGoToPlanList();
        }
        (async () => {
            this.sendMessage();
        })();
    }

    gotoDistillationPlanList() {
        this.router.navigate(['/pages/plans']);
    }

    terminateDistillationProcess() {
        this.distillationFinished = true;
        this.makeFinishToastAndGoToFinishPage();
        this.disconnect();
        this.gotoDistillationPlanList();
        return;
    }

    makeNoPlanInProgressToastAndGoToPlanList() {
        if (!this.distillationFinished) {
            this.distillationFinished = true;
            this.showToast('warning', 'No distillation plan in progress!', 'There is currently no distillation plan in progress. Please start one from the list of distillation plans.');
            this.disconnect();
            this.gotoDistillationPlanList();
        }
    }

    toggleView() {
        this.flipped = !this.flipped;
    }

    jumpToNextPhase() {
        this.distillationPhaseService.jumpToNextPhase(this.distillationProcessDataToFrontendDto.distillationPlanDto).subscribe();
        this.toggleView();
    }

    terminateDistillationPlan() {
        this.makeFinishToastAndGoToFinishPage();
        this.distillationPlanService.terminate(this.distillationProcessDataToFrontendDto.distillationPlanDto).subscribe();
    }

    private makeFinishToastAndGoToFinishPage() {
        this.showToast('success', 'Distillation finished!', 'The distillation plan ' + this.distillationProcessDataToFrontendDto.distillationPlanDto.name + ' has been successfully finished.');
    }

    private showToast(type: NbComponentStatus, title: string, body: string) {
        const config = {
            status: type,
            destroyByClick: true,
            duration: 5000,
            hasIcon: this.toastHasIcon,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: true,
        };
        const titleContent = title ? `${title}` : '';

        this.toastIndex += 1;
        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }
}
