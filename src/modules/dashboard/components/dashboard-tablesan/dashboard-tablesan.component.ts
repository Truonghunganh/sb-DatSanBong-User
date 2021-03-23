import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Datsan} from '../../models/dashboard.model' 
import {AuthService} from '../../../auth/services/auth.service';
import { formatDate } from '@angular/common';
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
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
    idquan=1;
    sans: any;
    chekquanvasan= false;
    checkdatsans = false;
    quan:any;
    url = environment.url;
    mangDatsan=new Array();
    today = new Date().toISOString().slice(0, 10);
    ngayvagio:string="";
    ngOnInit() {
        this.checktoken();
    }
    checktoken() {
        this.authService.checkTokenUser().subscribe(data => {
            console.log(data);
            
            if (!data.status) {
                this.router.navigate(['/auth/login']);
            } else {
                this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
                this.ngayvagio = new Date().toISOString().slice(0, 10);
                this.getDatSansvaSansByUserAndIdquanAndNgay(this.idquan, this.ngayvagio);
            }
        })
    }
    chonngay(ngay :any){
        this.ngayvagio = ngay.target.value;
        console.log(ngay.target.value);
        this.getDatSansvaSansByUserAndIdquanAndNgay(this.idquan, ngay.target.value);
        
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

    getDatSansvaSansByUserAndIdquanAndNgay(idquan: number, ngay: any){
        
        this.checkdatsans = false;
        this.dashboardService.getDatSansvaSansByUserAndIdquanAndNgay(idquan, ngay).subscribe(data=>{
            console.log(data);
            
            if (data.status){
                const arrMang = new Array();
                for (let i = 0; i < data.datsans.length; i++) {
                    arrMang[i] = this.mangdatsancuamotsan(data.datsans[i]);
                }
                this.reviewuser = Math.round(data.reviewcuauser);
                this.mangreviewuser = this.taomotmangreview(this.reviewuser);
                this.reviewquan = Math.round(data.quan.review);
                this.mangreviewquan = this.taomotmangreview(this.reviewquan);
                this.mangDatsan = arrMang;
                if(!this.chekquanvasan){
                    this.quan = data.quan;
                    this.sans = data.sans;
                    this.chekquanvasan=true;
                }
                this.checkdatsans= true;
                this.changeDetectorRef.detectChanges();
            }
        })
    }

    updatereview(){
        this.dashboardService.reviewByUser(this.idquan,this.reviewuser).subscribe(data =>{
            if (data.status) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });

            }else{
                Swal.fire({
                    icon: 'error',
                    text: data.message,
                })
            }

        })
    }
    chonreview(review: number){
        this.mangreviewuser=this.taomotmangreview(review);
        this.reviewuser= review;
    }
    mangreviewquan: any;
    mangreviewuser: any;
    reviewuser = 0;
    reviewquan = 0;

    taomotmangreview(review: number) {
        switch (review) {
            case 0: return [false, false, false, false, false];
            case 1: return [true, false, false, false, false];
            case 2: return [true, true, false, false, false];
            case 3: return [true, true, true, false, false];
            case 4: return [true, true, true, true, false];
            case 5: return [true, true, true, true, true];
            default:
                break;
        }
    }

    datsan(gio: number, idsan: number, priceperhour: number, namesan: string, numberpeople:number){
        let ngay = this.ngayvagio.substr(0,10);
        switch (gio) {
            case 0:
                this.ngayvagio = ngay + " 05:00:00";
                break;
            case 1:
                this.ngayvagio = ngay + " 06:00:00";
                break;
            case 2:
                this.ngayvagio = ngay + " 07:00:00";
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
        if (!(this.ngayvagio > formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US'))) {
            Swal.fire({
                icon: 'error',
                text: 'ngày giờ đặt sân trước ngày giờ hiện tại',
            })
        }else{
            Swal.fire({
                html: '<h1 style="color: #41c04d;">thông tin sân mà bạn muốn đặt</h1><table style="width: 100%;" border="1"><tr><td>tên quán </td><td>' + this.quan.name + '</td></tr><tr><td>tên sân </td><td>' + namesan + '</td></tr><tr><td>số người </td><td>' + numberpeople + '</td></tr><tr><td>số tiền thanh toán</td><td>' + priceperhour + '</td></tr><tr><td>giờ đặt</td><td>' + this.ngayvagio + '</td></tr></table>',
                showCancelButton: true,
                confirmButtonText: `thanh toán`,
            }).then(result => {
                if (result.value) {

                    const ds = new Datsan(idsan, this.ngayvagio, priceperhour);
                    this.dashboardService.addDatSan(ds).subscribe(data => {
                        console.log(data);
                        
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Bạn đã đặt sân thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.getDatSansvaSansByUserAndIdquanAndNgay(this.idquan, ngay);
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                text: 'Giờ này có bạn khác đặt rồi !',
                            })
                        }
                    });
                } 
            });
            
        }

    }
    hienthibinhluan="Xem binh luận";
    checkhienthibinhluan=false;
    checkcomments=false;
    comments: any;
    xembinhluan(){
        this.checkhienthibinhluan=!this.checkhienthibinhluan;
        if (this.checkhienthibinhluan) {
            this.hienthibinhluan="Ẩn bình luận";
            this.checkcomments=false;
            this.dashboardService.getAllCommentCuaMotQuan(this.idquan).subscribe(data => {
                console.log(data);
                
                if(data.status){
                    this.comments=data.comments;
                    for (let i = 0; i < this.comments.length; i++) {
                        this.mangreview[i] = this.taomotmangreview(Math.round(this.comments[i].review));
                        this.mangBL[i]=false;
                    }
                    console.log(this.mangreview);

                    this.checkcomments=true;
                    this.changeDetectorRef.detectChanges();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: data.message,
                    })
                }
            })           
        }else{
            this.hienthibinhluan = "Xem binh luận";

        }
    }
    binhluan ="";
    binhluancuaban(){
        this.dashboardService.addComment(this.idquan, this.binhluan).subscribe(data =>{
            if (data.status) {
                this.comments = data.comments;
                for (let i = 0; i < this.comments.length; i++) {
                    this.mangreview[i] = this.taomotmangreview(Math.round(this.comments[i].review));
                    this.mangBL[i] = false;
                }
                console.log(this.mangreview);

                this.checkcomments = true;
                this.changeDetectorRef.detectChanges();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
            }
            this.binhluan="";
        })
        
    }
    mangreview = new Array();
    xoabinhluan(id:number){
        console.log(id);
        
    }
    
    chinhsuaBL(vitri: number,id: number, binhluan: string){
        console.log(id,binhluan);
        this.mangBL[vitri]=false;
        this.dashboardService.updateComment(id, binhluan).subscribe(data=>{
            if (data.status) {
                this.comments = data.comments;
                console.log(this.comments);
                console.log(this.mangBL);
                
                this.checkcomments = true;
                this.changeDetectorRef.detectChanges();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
            }
        })
    }
    chon(i: number){
        for (let k = 0; k < this.mangBL.length; k++) {
            this.mangBL[k]=false;
            
        }
        this.mangBL[i]=true;

    }
    mangBL= new Array();
}
