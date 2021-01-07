import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'sb-dashboard-listquans',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-listquans.component.html',
    styleUrls: ['dashboard-listquans.component.scss'],
})
export class DashboardListquansComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location

        ) {}
    iduser=1;
    listquans$: any;
    url = environment.url;
    urlCLU= environment.urlCLU;
    ngOnInit() {
        this.iduser= Number(this.activatedRoute.snapshot.paramMap.get('iduser'));
        environment.iduser=this.iduser;
        
        this.getListquans();
    }
    getListquans() {
        this.listquans$=this.dashboardService.getListQuans().pipe(map((result=>result.quan)))
        this.dashboardService.getListQuans().subscribe(data=>{
            console.log(data);
            
        });
    }
}
