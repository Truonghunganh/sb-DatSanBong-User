import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import {  Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';


@Component({
    selector: 'sb-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user.component.html',
    styleUrls: ['user.component.scss'],
})
export class UserComponent implements OnInit {
    user: any;
    checkuser = false;
    ListDatSanByIduservaonhungngaytoi: any;
    checklistdansan = false;
    constructor(
        private dashboardService: DashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authService: AuthService
    ) { }
    ngOnInit() {
        this.checkTokenUser();
    }
    checkTokenUser(){
        this.checkuser=false;
        this.authService.checkTokenUser().subscribe(result=>{
            if (result.status) {
                this.user= result.user;
                this.checkuser=true;
                this.getListDatSanByUserToken();
 
            } else {
                this.router.navigate(['/auth/login']);
            }
        })
    }
    
    getListDatSanByUserToken() {
        this.checklistdansan = false;
        this.dashboardService.getListDatSanByUserToken().subscribe(result => {
            console.log(result);
            
            if (result.status) {
                this.ListDatSanByIduservaonhungngaytoi = result.datsans;
                this.checklistdansan = true;
                this.changeDetectorRef.detectChanges();
            } 
        })
    }
    editUser(){
        this.router.navigate(['/dashboard/edituser']);
        
    }
    deleteDatSan(datsan:any){
        console.log(datsan);
        Swal.fire({
            html: '<h1 style="color: #41c04d;">Bạn có muốn xóa đặt sân này không</h1><table style="width: 100%;" border="1"><tr><td>tên quán </td><td>' + datsan.nameQuan + '</td></tr><tr><td>Địa chỉ quán </td><td>' + datsan.addressQuan + '</td></tr><tr><td>Số điện Thoại Quán </td><td>' + datsan.phoneQuan + '</td></tr><tr><td>tên sân </td><td>' + datsan.nameSan + '</td></tr><tr><td>số người </td><td>' + datsan.numberpeople + '</td></tr><tr><td>số tiền thanh toán</td><td>' + datsan.price + '</td></tr><tr><td>giờ đặt</td><td>' + datsan.time + '</td></tr><tr><td>xác nhận chủ quán</td><td>' + datsan.xacnhan + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `Xóa đặt sân`,
        }).then(result => {
            if (result.value) {

                this.dashboardService.deleteDatSan(datsan.id).subscribe(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.getListDatSanByUserToken();
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })
                    }
                });
            }
        });

        
    }
}
