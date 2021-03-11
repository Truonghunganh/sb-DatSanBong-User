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
        console.log(Math.round(55.45));
        this.checktoken();
        
    }

    checktoken(){
        this.authService.checkTokenUser().subscribe(data=>{
            console.log(data);
            
            if (!data.status) {
                this.router.navigate(['/auth/login']);
            }else{
                this.getListquans(this.page);
                
            }
        })
    }
    mangreview=new Array();
    getListquans(page: number) {
        this.checkquan= false;
        this.motmangreview=this.taomotmangreview(3);
        this.dashboardService.getListQuans(page).subscribe(data=>{
            if(data.status){
                this.listquans=data.quans;
                for (let i = 0; i < this.listquans.length; i++) {
                    this.mangreview[i]=this.taomotmangreview(Math.round(this.listquans[i].review))                  
                }
                this.checkquan=true;
                this.tongpage=data.tongpage;
                this.taomangtrang(this.page);
                this.changeDetectorRef.detectChanges();
            }
        })
    }

    motmangreview: any;
    taomotmangreview(review: number){
        switch (review) {
            case 0:return [false, false, false, false, false];
            case 1:return [true , false, false, false, false];
            case 2:return [true , true , false, false, false];
            case 3:return [true , true , true , false, false];
            case 4:return [true , true , true , true , false];
            case 5:return [true , true , true , true , true];
            default:
                break;
        }
    }
    page = 1;
    tongpage = 0;
    mangtrang: any;
    taomangtrang(page: number) {
        var mang: Array<boolean> = [];
        for (let i = 0; i < this.tongpage; i++) {
            mang.push(false);

        }
        mang[page - 1] = true;
        this.mangtrang = mang;

    }

    Previous() {
        if (this.page > 1) {
            this.page--;
            this.getListquans(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.getListquans(this.page);
        }
    }
    chontrang(page: number) {
        this.page = page;
        this.getListquans(this.page);
    }

}
