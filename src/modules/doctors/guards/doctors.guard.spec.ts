import { TestBed } from '@angular/core/testing';

import { DoctorsGuard } from './doctors.guard';

describe('_Template Module Guards', () => {
    let doctorsGuard: DoctorsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [DoctorsGuard],
        });
        doctorsGuard = TestBed.inject(DoctorsGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            doctorsGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
