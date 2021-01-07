import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppCommonService } from '@common/services';
import { catchError, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

@Injectable()
export class TrangchuService {
    constructor(private http: HttpClient, private appCommonService: AppCommonService) {}

    getTrangchu$(): Observable<{}> {
        return of({});
    }
    getSlides$(): Observable<any> {
       return this.http
            .get<any>(environment.url + "/api/v1/quan")
            .pipe(
                tap(data => {
                    console.log(data);
                    
                },
                catchError(this.appCommonService.errorHandler)
            ));
        // return this.http
        //     .get<any>(environment.url +"/api/v1/slide")
        //     .pipe(
        //         tap(data => of(data)),
        //         catchError(this.appCommonService.errorHandler)
        //     );
    }

}
