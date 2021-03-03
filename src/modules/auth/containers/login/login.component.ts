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
    submit(phone : string, password : string){
        console.log(phone,password);
        const user=new User(phone,password);
        this.authService.login(user).subscribe(result => {
            if (result.status) {
                this.router.navigate(['/dashboard/quans']);
            } else {
                Swal.fire({
                    icon: 'error',
                    text: '"phone or password is false of user!',
                })
            }
        })
    }
}
