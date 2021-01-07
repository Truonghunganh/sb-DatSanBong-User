import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { AppCommonService } from './../../app-common/services/app-common.service';
import { Admin, Admin1 } from './../models/auth.model';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private appCommonService: AppCommonService,
        @Inject(LOCAL_STORAGE) private storage: WebStorageService
    ) {
        this.adminSubject = new BehaviorSubject<Admin1>(JSON.parse(this.storage.get('admin')));
    }
    public httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Credentials': 'true',
            'Api-Key': `${environment.apiKey}`,
        }),
    };
    private adminSubject: any;

    login$(admin: Admin): Observable<any> {
        // console.log(admin);

        return this.http.post<any>(`/api/login`, admin, this.httpOptions).pipe(
            tap(data => {
                if (data.success) {
                    if (data.data.user.role_id === 1 && data.data.user.status === 1) {
                        this.storage.set('admin', JSON.stringify(data.data));
                        this.adminSubject.next(data.data);
                        return of(data);
                    }
                }
                return of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        );
    }
}
