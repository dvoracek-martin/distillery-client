import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Distillation plans',
        icon: 'list-outline',
        link: '/pages/plans',
        home: true,
    },
    {
        title: 'Create a distillation plan',
        icon: 'file-add-outline',
        link: '/pages/add',
    },
    {
        title: 'Distillation plan in progress',
        icon: 'settings-2-outline',
        link: '/pages/distillation-process',
    },
    {
        title: 'Distillation procedure history',
        icon: 'clock-outline',
        link: '/pages/distillation-procedure-list',
    },
];
