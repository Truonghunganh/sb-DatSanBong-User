import { ChangeDetectionStrategy, Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'
declare const L: any;

@Component({
    selector: 'sb-google-maps-search-quan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './google-maps-search-quan.component.html',
    styleUrls: ['google-maps-search-quan.component.scss'],
})
export class GoogleMapsSearchQuanComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef

        ) {}
    ngOnInit() {
        this.checktoken()
        
    }
    url= environment.url+"/api/v1/";
    listquans: any;
    checktoken() {
        this.authService.checkTokenUser().subscribe(data => {
            console.log(data);

            if (!data.status) {
                this.router.navigate(['/auth/login']);
            } else {
                this.getListquans();

            }
        })
    }
    getListquans() {
        this.dashboardService.getAllQuanDangHoatdongByUser().subscribe(data => {
            console.log(data);

            if (data.status) {
                this.listquans = data.quans;
                this.hienVitricacquan(this.listquans);
                this.changeDetectorRef.detectChanges();
            }
        })
    }


    hienVitricacquan(quans:any){
        if (!navigator.geolocation) {
            console.log('location is not supported');
        }
        console.log(quans);
        
        navigator.geolocation.getCurrentPosition((position) => {
            const coords = position.coords;
            const latLong = [coords.latitude, coords.longitude];
            console.log(
                `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
            );
            let mymap = L.map('map').setView(latLong, 13);

            L.tileLayer(
                'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
                {
                    attribution:
                        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'your.mapbox.access.token',
                }
            ).addTo(mymap);

            for (let i = 0; i < quans.length; i++) {
                L.marker([quans[i].vido, quans[i].kinhdo]).addTo(mymap).bindPopup(
                    '<table class="table"><tbody>'+
                    '<tr><td> Tên  :</td><td>'+quans[i].name+'</td></tr>'+
                    '<tr><td> địa chỉ :</td><td>' + quans[i].address + '</td></tr>' +
                    '<tr><td> số điện thoại :</td><td>' + quans[i].phone + '</td></tr>' +
                    '</tbody></table>'+ 
                    '<a href="/dashboard/quans/'+quans[i].id+'">chọn sân này</a>'
                    ).openPopup();
               
                // circle.bindPopup("I am a circle.");
                // polygon.bindPopup("I am a polygon.");
            }

            L.marker(latLong).addTo(mymap).bindPopup('<strong>tôi đang ở đây </strong>').openPopup();


        });
    }
}
