import { TestBed } from '@angular/core/testing';

import { TrangchuService } from './trangchu.service';

describe('TrangchuService', () => {
    let trangchuService: TrangchuService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TrangchuService],
        });
        trangchuService = TestBed.inject(TrangchuService);
    });

    describe('getTrangchu$', () => {
        it('should return Observable<Trangchu>', () => {
            trangchuService.getTrangchu$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
