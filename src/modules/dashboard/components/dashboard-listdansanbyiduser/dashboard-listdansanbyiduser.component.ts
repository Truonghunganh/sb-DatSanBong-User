import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'sb-dashboard-listdansanbyiduser',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-listdansanbyiduser.component.html',
    styleUrls: ['dashboard-listdansanbyiduser.component.scss'],
})
export class DashboardListdansanbyiduserComponent implements OnInit {
    user: any;
    checkuser=false;
    ListDatSanByIduservaonhungngaytoi:any;
    checklistdansan=false;
    constructor(
        private dashboardService: DashboardService, 
        private changeDetectorRef:  ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,

        ) {}
    ngOnInit() {
        environment.iduser = Number(this.activatedRoute.snapshot.paramMap.get('iduser'));

        this.getUserByID(environment.iduser);
        console.log(environment.iduser);
        this.getListDatSanByIduser(environment.iduser);
    }
    getUserByID(id: number){
        this.checkuser=false;
        this.dashboardService.getUserByID(id).subscribe(result =>{
            console.log(result);
            
            this.user = result.user[0];
            this.checkuser=true; 
            this.changeDetectorRef.detectChanges();
        })        
    }
    getListDatSanByIduser(id: number){
        this.checklistdansan=false;
        this.dashboardService.getListDatSanByIduser(id).subscribe(result =>{
            if(result.status){
                this.ListDatSanByIduservaonhungngaytoi=result.datsans;
                this.checklistdansan=true;
                this.changeDetectorRef.detectChanges();
            }
        })
    }
}
