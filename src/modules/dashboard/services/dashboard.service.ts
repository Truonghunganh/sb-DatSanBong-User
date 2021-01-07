import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppCommonService } from '@common/services';
import { catchError, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";


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
}
