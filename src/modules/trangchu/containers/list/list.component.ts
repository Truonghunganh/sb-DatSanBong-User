import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './list.component.html',
    styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
