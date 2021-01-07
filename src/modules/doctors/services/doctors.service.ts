import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppCommonService } from '@common/services';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class DoctorsService {
    constructor(private http: HttpClient, private appCommonService: AppCommonService) {}

    getDoctors$(page: number, status: number): Observable<any> {
        return this.http
            .get<any>(
                `api/users?role_name=Doctor&page=${page}&status=${status}`,
                this.appCommonService.httpOptions
            )
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    getListNewApproveDoctors(): Observable<any> {
        return this.http.get<any>(`api/doctors/waiting`, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)),
            catchError(this.appCommonService.errorHandler)
        );
    }
    getDoctorDetailID(doctorId: number): Observable<any> {
        console.log(doctorId);

        return this.http.get<any>(`api/users/${doctorId}`, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)),
            catchError(this.appCommonService.errorHandler)
        );
    }
    agreeDoctor(doctorId: number): Observable<any> {
        return this.http
            .post<any>(`/api/doctors/accept?`, [doctorId], this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
}
