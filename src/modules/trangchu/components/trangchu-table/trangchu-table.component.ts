import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { TrangchuService } from "../../services/trangchu.service";
import { map } from 'rxjs/operators';

@Component({
    selector: 'sb-trangchu-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './trangchu-table.component.html',
    styleUrls: ['trangchu-table.component.scss'],
})
export class TrangchuTableComponent implements OnInit {
    url=environment.url;
    slides$:any;
    constructor(private trangchuService: TrangchuService) {}
    ngOnInit() {
        this.slides$=this.trangchuService.getSlides$().pipe(map(data=>data.slide));
    }
}
