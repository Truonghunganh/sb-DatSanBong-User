import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { DoctorsService } from './../../services/doctors.service';

@Component({
    selector: 'sb-doctor-approve',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './doctor-approve.component.html',
    styleUrls: ['doctor-approve.component.scss'],
})
export class DoctorApproveComponent implements OnInit {
    listNewApproveDoctors$: any;
    constructor(private doctorsService: DoctorsService) {}
    ngOnInit() {
        this.getListNewApproveDoctors();
    }
    getListNewApproveDoctors() {
        this.listNewApproveDoctors$ = this.doctorsService
            .getListNewApproveDoctors()
            .pipe(map(data => data.data.users));
    }
    agree(id: number) {
        const doctorID = Number(id);
        this.doctorsService.agreeDoctor(doctorID).subscribe(data => {
            if (data.success) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.getListNewApproveDoctors();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            }
        });
    }
}
