import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

import { environment } from './../../environments/environment';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     canActivate: [],
    //     component: dashboardContainers.DashboardComponent,
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'quan/' + environment.iduser,
        //redirectTo: 'quan/:iduser',
    },

    {
        path: 'quan/:iduser',
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'san/:iduser/:idquan',
        canActivate: [],
        component: dashboardContainers.DashboardListsanComponent,
    },
    {
        path: 'user/:iduser',
        canActivate: [],
        component: dashboardContainers.ListdansanbyiduserComponent,
    },

  
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {};
