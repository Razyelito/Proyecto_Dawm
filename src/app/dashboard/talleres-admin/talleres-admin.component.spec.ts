import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalleresAdminComponent } from './talleres-admin.component';

describe('TalleresAdminComponent', () => {
  let component: TalleresAdminComponent;
  let fixture: ComponentFixture<TalleresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalleresAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalleresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
