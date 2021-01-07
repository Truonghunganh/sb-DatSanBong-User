import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-approve',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './approve.component.html',
    styleUrls: ['approve.component.scss'],
})
export class ApproveComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
