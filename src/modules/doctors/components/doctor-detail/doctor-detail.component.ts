import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';
import { DoctorsService } from './../../services/doctors.service';

@Component({
    selector: 'sb-doctor-detail',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './doctor-detail.component.html',
    styleUrls: ['doctor-detail.component.scss'],
})
export class DoctorDetailComponent implements OnInit {
    doctorDetail$: any;
    doctorDetail: any;
    doctorId = 0;
    select: boolean[] = [true, false, false];
    url = environment.url;
    constructor(private router: ActivatedRoute, private doctorsService: DoctorsService) {}
    ngOnInit() {
        this.doctorId = Number(this.router.snapshot.paramMap.get('doctorId'));
        this.getDoctorDetailID();
    }
    getDoctorDetailID() {
        this.doctorDetail$ = this.doctorsService
            .getDoctorDetailID(this.doctorId)
            .pipe(map(data => (this.doctorDetail = data.data)));
    }
    selection(so: number) {
        console.log(so);

        for (let i = 0; i < 3; i++) {
            this.select[i] = false;
        }
        this.select[so] = true;
    }
}
