import { TestBed } from '@angular/core/testing';

import { HistorialVisitasService } from './historial-visitas.service';

describe('HistorialVisitasService', () => {
  let service: HistorialVisitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialVisitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
