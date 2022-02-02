import { TestBed } from '@angular/core/testing';

import { HistorialArticulosService } from './historial-articulos.service';

describe('HistorialArticulosService', () => {
  let service: HistorialArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialArticulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
