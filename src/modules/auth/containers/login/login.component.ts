import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Admin } from './../../models/auth.model';
import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginFormGroup: any;
    error = '';
    a = true;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}
    ngOnInit() {
        this.loginFormGroup = this.formBuilder.group({
            phone: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    onSubmit() {
        console.log(this.loginFormGroup.controls.phone.value);
        const admin = new Admin(
            this.loginFormGroup.controls.phone.value,
            this.loginFormGroup.controls.password.value
        );
        this.authService.login$(admin).subscribe(data => {
            if (data.success) {
                if (data.data.user.role_id === 1 && data.data.user.status === 1) {
                    this.router.navigate(['/categories/list']);
                }
            } else {
                console.log(1);

                this.error = data.message;
                this.a = false;
            }
        });
    }
}
