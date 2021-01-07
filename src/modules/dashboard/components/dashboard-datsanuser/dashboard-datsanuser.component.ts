import { ChangeDetectionStrategy, Component, OnInit, Injectable } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'sb-dashboard-datsanuser',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-datsanuser.component.html',
    styleUrls: ['dashboard-datsanuser.component.scss'],
})
export class DashboardDatsanuserComponent implements OnInit {
    events: any;

    options: any;

    constructor() { }

    ngOnInit() {
        this.events = [
            {
                "id": 1,
                "title": "All Day Event",
                "start": "2017-02-01"
            },
            {
                "id": 2,
                "title": "Long Event",
                "start": "2017-02-07",
                "end": "2017-02-10"
            },
            {
                "id": 3,
                "title": "Repeating Event",
                "start": "2017-02-09T16:00:00"
            }
        ]


        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: '2017-02-01',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true
        };
    }

    
   
}
