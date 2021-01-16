import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppCommonService } from '@common/services';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Datsan } from '../models/dashboard.model' 


@Injectable()
export class DashboardService {
    constructor(private http: HttpClient, private appCommonService: AppCommonService) {}

    getDashboard$(): Observable<{}> {
        return of({});
    }
    getListQuans(): Observable<any>{
        
        return this.http
            .get<any>(environment.url + "/api/v1/quan")
            .pipe(
                tap(data => {
                    of(data);
                },
                    catchError(this.appCommonService.errorHandler)
                ));
    }
    getQuanById(id: number): Observable<any>{
        return this.http.get<any>(environment.url + "/api/v1/quan/" + id)
                .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    getsanByidquan(idquan:number,ngay:any): Observable<any>{
        return this.http.get<any>(environment.url + "/api/v1/san?idquan=" + idquan + "&start_time="+ngay)
            .pipe(
                tap(data => {
                    of(data);
                },
                    catchError(this.appCommonService.errorHandler)
                ));
    }
    
    addDatSan(datsan: Datsan): Observable<any> {
        console.log(datsan);
        return this.http
            .post<any>(environment.url + "/api/v1/datsans", datsan, this.appCommonService.httpOptions1)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    getUserByID(id: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/users/"+id,this.appCommonService.httpOptions1).pipe(
            tap(data => of(data)),catchError(this.appCommonService.errorHandler));
    }
    getListDatSanByIduser(id: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/datsans/"+id,this.appCommonService.httpOptions1).pipe(
            tap(data => of(data)),catchError(this.appCommonService.errorHandler)
        );
    }
}
