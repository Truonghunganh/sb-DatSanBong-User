import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service'
@Component({
    selector: 'sb-dashboard-listquans',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-listquans.component.html',
    styleUrls: ['dashboard-listquans.component.scss'],
})
export class DashboardListquansComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef

        ) {}
    listquans: any;
    checkquan=false;
    url = environment.url;
    urlCLU= environment.urlCLU;
     ngOnInit() {
        this.checktoken();
        
    }

    checktoken(){
        this.authService.checkTokenUser().subscribe(data=>{
            console.log(data);
            
            if (!data.status) {
                this.router.navigate(['/auth/login']);
            }else{
                this.getListquans();
                
            }
        })
    }
    getListquans() {
        this.checkquan= false;
        this.dashboardService.getListQuans().subscribe(data=>{
            console.log(data);
            
            if(data.status){
                this.listquans=data.quans;
                this.checkquan=true;
                this.changeDetectorRef.detectChanges();
            }
        })
    }
}
