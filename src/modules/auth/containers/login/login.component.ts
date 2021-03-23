import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User} from './../../models/auth.model';
import Swal from 'sweetalert2';

import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginFormGroup: any;
    checklogin=false;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router, 
        private changeDetectorRef: ChangeDetectorRef

    ) {}
    ngOnInit() {
        
        this.loginFormGroup = this.formBuilder.group({
            phone: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.checklogin=false;
        this.authService.checkTokenUser().subscribe(
            result => {
                if (result.status) {
                    this.router.navigate(['/dashboard/quans']);
                }else{
                    this.checklogin=true;
                    this.changeDetectorRef.detectChanges();
                }
                
            }
        )
    }
    phone="";
    password="";
    onSubmit(){
        this.checklogin = false;
        const user = new User(this.phone, this.password);
        this.authService.login(user).subscribe(result => {
            if (result.status) {
                this.router.navigate(['/dashboard/quans']);
            } else {
                this.checklogin = true;
                Swal.fire({
                    icon: 'error',
                    text: 'số điện thoại hay mật khẩu sai !',
                })
                this.checklogin = true;
                this.changeDetectorRef.detectChanges();
            }
        })
    }
    
}
