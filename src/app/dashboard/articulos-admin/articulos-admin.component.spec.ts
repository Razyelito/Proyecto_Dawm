import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosAdminComponent } from './articulos-admin.component';

describe('ArticulosAdminComponent', () => {
  let component: ArticulosAdminComponent;
  let fixture: ComponentFixture<ArticulosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
