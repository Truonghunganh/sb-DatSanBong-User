import { TestBed } from '@angular/core/testing';

import { TrangchuGuard } from './trangchu.guard';

describe('_Template Module Guards', () => {
    let trangchuGuard: TrangchuGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [TrangchuGuard],
        });
        trangchuGuard = TestBed.inject(TrangchuGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            trangchuGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
