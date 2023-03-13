import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbAuthModule, NbDummyAuthStrategy} from '@nebular/auth';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {of as observableOf} from 'rxjs';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {AnalyticsService, LayoutService, SeoService, StateService} from './utils';
import {TemperatureHumidityData} from './data/temperature-flow-time';
import {TemperatureFlowTimeService} from './mock/temperature-flow-time.service';

const socialLinks = [
    {
        url: 'https://github.com/dvoracek-martin/distillery',
        target: '_blank',
        icon: 'github',
    },
];

const DATA_SERVICES = [
    {provide: TemperatureHumidityData, useClass: TemperatureFlowTimeService},
];

export class NbSimpleRoleProvider extends NbRoleProvider {
    getRole() {
        // here you could provide any role based on any auth flow
        return observableOf('guest');
    }
}

export const NB_CORE_PROVIDERS = [
    ...DATA_SERVICES,
    ...NbAuthModule.forRoot({
        strategies: [
            NbDummyAuthStrategy.setup({
                name: 'email',
                delay: 3000,
            }),
        ],
        forms: {
            login: {
                socialLinks: socialLinks,
            },
            register: {
                socialLinks: socialLinks,
            },
        },
    }).providers,

    NbSecurityModule.forRoot({
        accessControl: {
            guest: {
                view: '*',
            },
            user: {
                parent: 'guest',
                create: '*',
                edit: '*',
                remove: '*',
            },
        },
    }).providers,

    {
        provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
    },
    AnalyticsService,
    LayoutService,
    SeoService,
    StateService,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        NbAuthModule,
    ],
    declarations: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                ...NB_CORE_PROVIDERS,
            ],
        };
    }
}
