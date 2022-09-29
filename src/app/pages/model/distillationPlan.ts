import {DistillationPhase} from './distillationPhase';

export class DistillationPlan {
  id: number;
  name: string;
  description: string;
  distillationPhases: DistillationPhase[];
}
