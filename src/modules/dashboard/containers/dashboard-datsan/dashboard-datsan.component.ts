import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-datsan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-datsan.component.html',
    styleUrls: ['dashboard-datsan.component.scss'],
})
export class DashboardDatsanComponent implements OnInit {
    constructor() {
        console.log(67);
        
    }
    ngOnInit() {}
  
}
