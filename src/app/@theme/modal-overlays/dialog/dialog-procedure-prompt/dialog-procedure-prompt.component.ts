import {Component} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
    selector: 'ngx-dialog-procedure-prompt',
    templateUrl: 'dialog-procedure-prompt.component.html',
    styleUrls: ['dialog-procedure-prompt.component.scss'],
})
export class DialogProcedurePromptComponent {

    constructor(protected ref: NbDialogRef<DialogProcedurePromptComponent>) {
    }

    cancel() {
        this.ref.close();
    }

    submit(name) {
        this.ref.close(name);
    }
}
