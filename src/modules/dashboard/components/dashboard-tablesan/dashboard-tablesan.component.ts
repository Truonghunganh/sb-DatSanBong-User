import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'sb-dashboard-tablesan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-tablesan.component.html',
    styleUrls: ['dashboard-tablesan.component.scss'],
})
export class DashboardTablesanComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location

    ) { }
    iduser = 1;
    idquan=1;
    listsanByidquan$: any;
    listdatsanByidquan: any;
    quanByid$: any;
    quanByid:any;
    url = environment.url;
    private mang=new Array();
    today=Date.now();
    ngOnInit() {
         this.iduser = Number(this.activatedRoute.snapshot.paramMap.get('iduser'));
         this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        this.getSanByidquan(this.idquan, new Date());
        let today=new Date(); 
        const birthday = new Date('2021-01-10');

        console.log(today);

    }
    chonngay(ngay :any){
        console.log(ngay.target.value);
        this.getSanByidquan(this.idquan, ngay.target.value )    
    }
    mangdatsancuamotsan(san:any){
        let array = new Array(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);
        for(let i=0; i<san.length; i++){
            
            
            switch (san[i].start_time.slice(11,13)) {
                case "05":array[1]=true;break;
                case "06": array[2] = true; break;
                case "07": array[3] = true; break;
                case "08": array[4] = true; break;
                case "09": array[5] = true; break;
                case "10": array[6] = true; break;
                case "11": array[7] = true; break;
                case "13": array[8] = true; break;
                case "14": array[9] = true; break;
                case "15": array[10] = true; break;
                case "16": array[11] = true; break;
                case "17": array[12] = true; break;
                case "18": array[13] = true; break;
                case "19": array[14] = true; break;
                case "20": array[15] = true; break;
                
                default:
                    break;
            }
        }
        return array;
    }
    getSanByidquan(idquan: number, ngay: any){
        this.listsanByidquan$=this.dashboardService.getsanByidquan(idquan, ngay).pipe(map(result=>result.san));
        this.dashboardService.getsanByidquan(idquan,ngay).subscribe(result=>{
            console.log(result);
            this.listdatsanByidquan = result.datsans;
            console.log(this.listdatsanByidquan.length);
            for (let i = 0; i < this.listdatsanByidquan.length;i++){
                this.mang[i] = this.mangdatsancuamotsan(this.listdatsanByidquan[i]);
            }
            console.log(this.mang);
            
        })
    }
    getQuanByid(id:number){
        this.quanByid$ = this.dashboardService.getQuanById(id).pipe(map(result => this.quanByid = result.quan));
        
    }
}
