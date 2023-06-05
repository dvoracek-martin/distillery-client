export class DistillationProcessDataFromRaspiDto {
    timeStartedInMillis: number;
    timeElapsedSinceStartInMillis: number;
    distillationProcedureId: number;
    distillationPhaseId: number;
    temperature: number;
    flow: number;
    weight: number;
}
