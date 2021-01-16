import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Datsan} from '../../models/dashboard.model' 
import { Button } from 'protractor';

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
        private location: Location,
        private ref: ChangeDetectorRef
    ) { }
    iduser = 1;
    idquan=1;
    listsanByidquan$: any;
    listdatsanByidquan: any;
    quanByid$: any;
    quanByid:any;
    url = environment.url;
    mang=new Array();
    today = new Date().toISOString().slice(0, 10);
    ngayvagio:string="";
    trackingObservable = false;
    ngOnInit() {
        this.iduser = Number(this.activatedRoute.snapshot.paramMap.get('iduser'));
        environment.iduser=this.iduser;
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        this.getQuanByid(this.idquan);
        this.ngayvagio = new Date().toISOString().slice(0, 10);
        this.getSanByidquan(this.idquan,this.ngayvagio);
    }
    huhu(){
       console.log(1);
        
    }
    // cái ni khác
    // nếu k dùng
    // nếu dùng  
    async chonngay(ngay :any){
       // nếu không dùng thì nó load được dữ liệu 
        this.ngayvagio = ngay.target.value;
        console.log(ngay.target.value);
        this.getSanByidquan(this.idquan, ngay.target.value);
      // vậy ở đây hùng anh dùng cái Swal để làm gì. nó có tác dụng gì ở đây cả
      // đề làm cái khác
      // vậy thì bỏ vào cái khác đạt làm cho. chứ bỏ vào đây k hợp lệ. 
      // nếu dùng : nó k load lại dữ liệu
        // Swal.fire({
        //     html: '<h1 style="color: #41c04d;">thông tin sân mà bạn muốn đặt</h1>',
        //     text: "Do you want to save the changes?",
        //     showCancelButton: true,
        //     confirmButtonText: `thanh toán`,
        // }).then(async result => {
        //     if (result.value) {
        //         console.log(78);
                
        //         this.ngay = await ngay.target.value;
        //         console.log(ngay.target.value);
        //         this.getSanByidquan(this.idquan, ngay.target.value) ;
        //     }
        // });
        // console.log(11);
        
        
    }

   
    mangdatsancuamotsan(san:any){
        let array = new Array(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);
        for(let i=0; i<san.length; i++){
            switch (san[i].start_time.slice(11,13)) {
                case "05": array[0] = true;break;
                case "06": array[1] = true; break;
                case "07": array[2] = true; break;
                case "08": array[3] = true; break;
                case "09": array[4] = true; break;
                case "10": array[5] = true; break;
                case "11": array[6] = true; break;
                case "12": array[7] = true; break;
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

    trackByListSan(index: number, san: any) {
        return san;
    }
    
    getSanByidquan(idquan: number, ngay: any){
        
        this.listsanByidquan$=null;
        this.trackingObservable = false;
        console.log(this.trackingObservable, '1');
        
        this.dashboardService.getsanByidquan(idquan, ngay).subscribe( result=>{
            this.listdatsanByidquan=null;
            const arrMang = new Array();
            this.listdatsanByidquan = result.datsans;
            console.log(this.listdatsanByidquan,9999)
            for (let i = 0; i < this.listdatsanByidquan.length;i++){
                arrMang[i] = this.mangdatsancuamotsan(this.listdatsanByidquan[i]);
            }
            // console.log(this.mang[1][0]);
            this.mang = arrMang;
            this.listsanByidquan$ = this.dashboardService.getsanByidquan(idquan, ngay).pipe(map(result => result.san));
            this.trackingObservable = true;
            this.ref.detectChanges();
        })
    }

    getQuanByid(id:number){
        this.quanByid$ = this.dashboardService.getQuanById(id).pipe(map(result => this.quanByid = result.quan));
    }

    async datsan(gio: number, idsan: number, priceperhour: number, namesan: string, numberpeople:number){
        let ngay = this.ngayvagio.substr(0,10);
        
        switch (gio) {
            case 0:
                this.ngayvagio = ngay + " 05:00:00";
                break;
            case 1:
                this.ngayvagio = ngay + " 06:00:00";
                break;
            case 2:
                this.ngayvagio = ngay+ " 07:00:00";
                break;
            case 3:
                this.ngayvagio = ngay + " 08:00:00";
                break;
            case 4:
                this.ngayvagio = ngay + " 09:00:00";
                break;
            case 5:
                this.ngayvagio = ngay + " 10:00:00";
                break;
            case 6:
                this.ngayvagio = ngay + " 11:00:00";
                break;
            case 7:
                this.ngayvagio = ngay + " 12:00:00";
                break;

            case 8:
                this.ngayvagio = ngay + " 13:00:00";
                break;
            case 9:
                this.ngayvagio = ngay + " 14:00:00";
                break;
            case 10:
                this.ngayvagio = ngay + " 15:00:00";
                break;
            case 11:
                this.ngayvagio = ngay + " 16:00:00";
                break;

            case 12:
                this.ngayvagio = ngay + " 17:00:00";
                break;
            case 13:
                this.ngayvagio = ngay + " 18:00:00";
                break;
            case 14:
                this.ngayvagio = ngay + " 19:00:00";
                break;
            case 15:
                this.ngayvagio = ngay + " 20:00:00";
                break;


            default:
                break;
        }
        //  this.dashboardService.getsanByidquan(this.idquan, ngay).subscribe(async result => {
        //     this.mang[0][15] = await true;  
        //     console.log(this.mang);
            
        // });
        // console.log(1);
        


        // this.mang[0][15] = true;
        // console.log(this.mang);
        

        Swal.fire({
            html: '<h1 style="color: #41c04d;">thông tin sân mà bạn muốn đặt</h1><table style="width: 100%;" border="1"><tr><td>tên quán </td><td>' + this.quanByid.name + '</td></tr><tr><td>tên sân </td><td>' + namesan + '</td></tr><tr><td>số người </td><td>' + numberpeople + '</td></tr><tr><td>số tiền thanh toán</td><td>' + priceperhour + '</td></tr><tr><td>giờ đặt</td><td>' + this.ngayvagio + '</td></tr></table>',
            text: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: `thanh toán`,
        }).then(result => {
            if (result.value) {

                   const ds = new Datsan(idsan, this.iduser, this.ngayvagio, priceperhour);
                this.dashboardService.addDatSan(ds).subscribe(data => {
                    if (data.status) {
                        if (data.datsan.length != 0) {
                            this.getSanByidquan(this.idquan, ngay);
                            console.log(this.mang);
                        }
                        
               //         location.reload()
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            text: 'Giờ này có bạn khác đặt rồi !',
                        })
                    }
                });

            }else{
                
            }
        });


    }
}
