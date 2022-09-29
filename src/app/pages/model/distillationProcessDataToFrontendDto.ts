import {DistillationPhase} from './distillationPhase';
import {DistillationPlan} from './distillationPlan';

export class DistillationProcessDataToFrontendDto {
  distillationPlanDto: DistillationPlan;
  currentDistillationPhaseDto: DistillationPhase;
  temperature: number;
  flow: number;
  weight: number;
  timeElapsedInMillis: number;
  terminated: boolean;
  energyOn: boolean;
  paused: boolean;
  alcLevel: number;
}
