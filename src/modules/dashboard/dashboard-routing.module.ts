import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';


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
        redirectTo: 'a',
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
        path: 'a',
        canActivate: [],
        component: dashboardContainers.DashboardDatsanComponent,
    }

];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {};
