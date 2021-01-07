import { SBRouteData } from '@modules/navigation/models';
/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { DoctorsModule } from './doctors.module';

/* Containers */
import * as doctorsContainers from './containers';

/* Guards */
import * as doctorsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
    },
    {
        path: 'list',
        canActivate: [],
        component: doctorsContainers.ListComponent,
        data: {
            title: 'List Doctors',
        } as SBRouteData,
    },
    {
        path: 'approve',
        canActivate: [],
        component: doctorsContainers.ApproveComponent,
        data: {
            title: 'Approve Doctor',
        } as SBRouteData,
    },
    {
        path: 'detail/:doctorId',
        canActivate: [],
        component: doctorsContainers.DetailComponent,
        data: {
            title: 'detail Doctor',
        } as SBRouteData,
    },
];

@NgModule({
    imports: [DoctorsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DoctorsRoutingModule {}
