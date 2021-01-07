import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';
import { DoctorsService } from './../../services/doctors.service';

@Component({
    selector: 'sb-doctors-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './doctors-table.component.html',
    styleUrls: ['doctors-table.component.scss'],
})
export class DoctorsTableComponent implements OnInit {
    page = 1;
    status = 1;
    doctors$: any;
    url = environment.url;
    constructor(private doctorsService: DoctorsService) {}
    ngOnInit() {
        this.getDoctors();
    }
    getDoctors() {
        this.doctors$ = this.doctorsService
            .getDoctors$(this.page, this.status)
            .pipe(map(data => data.data.users));
    }
    ChangeStatus() {
        this.status = this.status === 1 ? 0 : 1;
        this.getDoctors();
    }
    previousPage() {
        if (this.page > 1) {
            this.page = this.page - 1;
            this.getDoctors();
        }
    }
    nextPage() {
        this.page = this.page + 1;
        this.getDoctors();
    }
}
