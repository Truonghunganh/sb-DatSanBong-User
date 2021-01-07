import { TestBed } from '@angular/core/testing';

import { DoctorsService } from './doctors.service';

describe('DoctorsService', () => {
    let doctorsService: DoctorsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DoctorsService],
        });
        doctorsService = TestBed.inject(DoctorsService);
    });

    describe('getDoctors$', () => {
        it('should return Observable<Doctors>', () => {
            doctorsService.getDoctors$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
