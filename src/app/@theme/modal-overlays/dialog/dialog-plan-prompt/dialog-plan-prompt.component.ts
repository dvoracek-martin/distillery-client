import {Component} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-plan-prompt',
  templateUrl: 'dialog-plan-prompt.component.html',
  styleUrls: ['dialog-plan-prompt.component.scss'],
})
export class DialogPlanPromptComponent {

  constructor(protected ref: NbDialogRef<DialogPlanPromptComponent>) {
  }

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}
