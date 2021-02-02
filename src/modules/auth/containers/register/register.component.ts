import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {User1} from '../../models/auth.model';
import {AuthService} from '../../services/auth.service'
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router
        ) {}
    ngOnInit() {
        this.authService.checkTokenUser().subscribe(
            result => {
                console.log(result);
                if (result.status) {
                    this.router.navigate(['/dashboard/quan']);
                }
            }
        )

    }
    RegisterUser(name: string,phone: string,gmail: string,address: string,password: string){
        const user = new User1(name,phone,gmail,address,password);
        this.authService.RegisterUser(user).subscribe(data =>{
            if (data.status) {
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                this.router.navigate(['/auth/login'])
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            }

        });
    }
}
