/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as doctorsComponents from './components';

/* Containers */
import * as doctorsContainers from './containers';

/* Guards */
import * as doctorsGuards from './guards';

/* Services */
import * as doctorsServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...doctorsServices.services, ...doctorsGuards.guards],
    declarations: [...doctorsContainers.containers, ...doctorsComponents.components],
    exports: [...doctorsContainers.containers, ...doctorsComponents.components],
})
export class DoctorsModule {}
