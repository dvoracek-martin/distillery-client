import {NgModule} from '@angular/core';
import {NbButtonModule, NbCardModule} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';

import {MiscellaneousRoutingModule} from './miscellaneous-routing.module';
import {MiscellaneousComponent} from './miscellaneous.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TemperatureDraggerComponent} from './temperature-dragger/temperature-dragger.component';

@NgModule({
    imports: [
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        MiscellaneousRoutingModule,
    ],
    declarations: [
        MiscellaneousComponent,
        NotFoundComponent,
        TemperatureDraggerComponent,
    ],
    exports: [
        TemperatureDraggerComponent,
    ],
})
export class MiscellaneousModule {
}
