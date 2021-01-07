/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { TrangchuModule } from './trangchu.module';

/* Containers */
import * as trangchuContainers from './containers';

/* Guards */
import * as trangchuGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'list',
        canActivate: [],
        component: trangchuContainers.ListComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
    },

];

@NgModule({
    imports: [TrangchuModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TrangchuRoutingModule {}
