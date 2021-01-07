/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as trangchuComponents from './components';

/* Containers */
import * as trangchuContainers from './containers';

/* Guards */
import * as trangchuGuards from './guards';

/* Services */
import * as trangchuServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...trangchuServices.services, ...trangchuGuards.guards],
    declarations: [...trangchuContainers.containers, ...trangchuComponents.components],
    exports: [...trangchuContainers.containers, ...trangchuComponents.components],
})
export class TrangchuModule {}
