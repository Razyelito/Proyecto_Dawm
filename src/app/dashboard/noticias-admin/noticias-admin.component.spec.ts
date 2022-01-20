import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasAdminComponent } from './noticias-admin.component';

describe('NoticiasAdminComponent', () => {
  let component: NoticiasAdminComponent;
  let fixture: ComponentFixture<NoticiasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
