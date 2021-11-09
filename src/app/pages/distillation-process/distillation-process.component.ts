import {Component, OnInit} from '@angular/core';
import {DistillationPlan} from '../model/distillationPlan';
import {ExchangeData} from '../model/exchangeData';
import {ExchangeDataService} from '../service/exchange-data-service';
import {DistillationPlanService} from '../service/distillation-plan.service';
import {DistillationPhaseService} from '../service/distillation-phase.service';
import {Router} from '@angular/router';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-app-distillation-process',
  templateUrl: './distillation-process.component.html',
  styleUrls: ['./distillation-process.component.css',
    '../../@theme/extra-components/progress-bar/interactive-progress-bar/interactive-progress-bar.component.scss'
    , '../../@theme/e-commerce/profit-card/profit-card.component.scss'
    , '../../@theme/modal-overlays/dialog/dialog.component.scss'],
})
export class DistillationProcessComponent implements OnInit {
  exchangeData: ExchangeData;
  distillationPlan: DistillationPlan;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;
  interval: any;
  currentPhaseIdPosition: number;
  isExchangeDataLoaded: boolean;
  isPhaseLoaded: boolean;
  isWaiting: boolean;
  timeElapsedMinutes: number;
  timeElapsedSeconds: number;
  timePresetMinutes: number;
  timePresetSeconds: number;
  timeLeftMinutes: number;
  timeLeftSeconds: number;
  start = new Date().getTime();
  progress = 0;
  flipped = false;

  constructor(
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private router: Router,
    private exchangeDataService: ExchangeDataService,
    private distillationPlanService: DistillationPlanService,
    private distillationPhaseService: DistillationPhaseService,
  ) {
    this.isExchangeDataLoaded = false;
    this.isPhaseLoaded = false;
    this.distillationPlan = new DistillationPlan();
    this.isWaiting = false;
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

  ngOnInit(): void {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 1000);
  }

  refreshData() {
    const elapsed = new Date().getTime() - this.start;
    let distillationFinished = false;
    this.exchangeDataService.getLast().subscribe(data => {
      this.exchangeData = data;
      this.isExchangeDataLoaded = true;

      if (elapsed > 2000 && (this.exchangeData.terminate === true
        && this.exchangeData.waiting === false
        && this.exchangeData.turnOn === false
      ) || (this.currentPhaseIdPosition === this.distillationPlan.distillationPhases.length - 1
        && this.timeLeftMinutes < 1 && this.timeLeftSeconds < 1)) {
        clearInterval(this.interval);
        distillationFinished = true;
        this.terminateDistillationProcess();
        this.exchangeDataService.deleteAll().subscribe();
        setTimeout(() => {
            this.gotoDistillationPlanList();
          },
          2500);
        return;
      }
      if (elapsed > 2000 && (this.exchangeData === undefined
        || this.exchangeData.terminate === true && !distillationFinished)) {
        this.makeNoPlanInProgressToastAndGoToPlanList();
        setTimeout(() => {
            clearInterval(this.interval);
            this.gotoDistillationPlanList();
          },
          2500);
        return;
      }
    });

    if (this.exchangeData === undefined) {
      return;
    }
    if (this.exchangeData === null) {
      if (elapsed > 2000) {
        this.makeNoPlanInProgressToastAndGoToPlanList();
        setTimeout(() => {
            clearInterval(this.interval);
            this.gotoDistillationPlanList();
          },
          2500);
      }
    }
    this.distillationPlanService.get(this.exchangeData.planId).subscribe(data => {
      this.distillationPlan = data;
      this.currentPhaseIdPosition = this.distillationPlan.distillationPhases.map(
        item => item.id).indexOf(this.exchangeData.currentPhaseId);
      this.timeElapsedMinutes = this.exchangeData.timeElapsed / 1000 / 60;
      this.timeElapsedSeconds = this.exchangeData.timeElapsed / 1000 % 60;
      const presetTime = this.distillationPlan.distillationPhases[this.currentPhaseIdPosition].time;
      this.timePresetMinutes = presetTime;
      this.timePresetSeconds = presetTime % 60;
      this.timeLeftMinutes = (this.distillationPlan.distillationPhases[this.currentPhaseIdPosition]).time
        - (this.exchangeData.timeElapsed / 1000 / 60);
      this.timeLeftSeconds = (this.timeLeftMinutes * 60) % 60;
      this.isPhaseLoaded = true;
      this.progress = Math.round((this.exchangeData.timeElapsed / 1000)
        / (((this.distillationPlan.distillationPhases[this.currentPhaseIdPosition]).time * 60) / 100));
    });
  }

  gotoDistillationPlanList() {
    this.router.navigate(['/pages/plans']);
  }

  pauseDistillationProcess() {
    const pauseExchangeData = this.exchangeDataDeepCopy();
    if (this.isWaiting === true) {
      pauseExchangeData.waiting = false;
      this.isWaiting = false;
    } else {
      pauseExchangeData.waiting = true;
      this.isWaiting = true;
    }
    this.exchangeDataService.updateExchangeData(pauseExchangeData).subscribe();
    this.toggleView();
  }

  terminateDistillationProcess() {
    const terminateExchangeData = this.exchangeDataDeepCopy();
    terminateExchangeData.terminate = true;
    clearInterval(this.interval);
    this.makeFinishToastAndGoToFinishPage();
    setTimeout(() => {
        this.exchangeDataService.updateExchangeData(terminateExchangeData).subscribe(
          (result => this.router.navigate(['/pages/distillation-finished'])));
      },
      2500);
    return;
  }

  makeNoPlanInProgressToastAndGoToPlanList() {
    this.showToast('warning', 'No distillation plan in progress!', 'There is currently no distillation plan in the progress. Please start one from the list of distillation plans.');
  }

  toggleView() {
    this.flipped = !this.flipped;
  }

  jumpToNextPhase() {
    this.distillationPhaseService.jumpToNextPhase(this.distillationPlan).subscribe();
    this.toggleView();
  }

  terminateDistillationPlan() {
    this.distillationPlanService.terminate(this.distillationPlan).subscribe();
    this.toggleView();
  }

  private exchangeDataDeepCopy(): ExchangeData {
    const exchangeDataCopy = new ExchangeData();
    exchangeDataCopy.currentPhaseId = this.exchangeData.currentPhaseId;
    exchangeDataCopy.planId = this.exchangeData.planId;
    exchangeDataCopy.alcLevel = this.exchangeData.alcLevel;
    exchangeDataCopy.waiting = this.exchangeData.waiting;
    exchangeDataCopy.weight = this.exchangeData.weight;
    exchangeDataCopy.turnOn = this.exchangeData.turnOn;
    exchangeDataCopy.flow = this.exchangeData.flow;
    exchangeDataCopy.temperature = this.exchangeData.temperature;
    exchangeDataCopy.terminate = this.exchangeData.terminate;
    exchangeDataCopy.time = this.exchangeData.time;
    exchangeDataCopy.timeElapsed = this.exchangeData.timeElapsed;
    return exchangeDataCopy;
  }

  private makeFinishToastAndGoToFinishPage() {
    this.showToast('success', 'Distillation finished!', 'The distillation plan ' + this.distillationPlan.name + ' has been successfully finished.');
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 15000,
      hasIcon: this.hasIcon,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
