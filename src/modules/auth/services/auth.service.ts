import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {User,User1} from "../models/auth.model"
import { environment } from './../../../environments/environment';
import { AppCommonService } from './../../app-common/services/app-common.service';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private appCommonService: AppCommonService,
        @Inject(LOCAL_STORAGE) private storage: WebStorageService,
        private router: Router
    ) {
//        this.adminSubject = new BehaviorSubject<Admin1>(JSON.parse(this.storage.get('admin')));
    }
    public httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Credentials': 'true',
        }),
    };
  //  private adminSubject: any;
    logout() {
        this.storage.set('tokenUser', JSON.stringify(1));
        this.router.navigate(['auth/login']);

    }
    checkTokenUser(): Observable<any>{
        return this.http.get<any>(environment.url + '/api/v1/checkTokenUser', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
    login(user : User): Observable<any>{
        return this.http.post<any>(environment.url + '/api/v1/loginUser', user, this.appCommonService.httpOptions).pipe(
            tap(data=>{
                console.log(data);
                if(data.status){                    
                    this.storage.set('tokenUser', JSON.stringify(data.token));                    
                }
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
    RegisterUser(user: User1): Observable<any> {
       console.log(user);
       
        return this.http.post<any>(environment.url + '/api/v1/registerUser', user).pipe(
            tap(data => {
                return of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

    setToken(token:string){
        this.storage.set('tokenUser', JSON.stringify(token));
    }

    getListQuans(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListQuansByTrangthaiChoHome")
            .pipe(tap(data => { of(data); },
                catchError(this.appCommonService.errorHandler)
            ));
    }
    searchListQuans(search: string): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/searchListQuans?search=" + search, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }

}
