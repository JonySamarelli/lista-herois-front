import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSuperpoderesComponent } from './lista-superpoderes.component';

describe('ListaSuperpoderesComponent', () => {
  let component: ListaSuperpoderesComponent;
  let fixture: ComponentFixture<ListaSuperpoderesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSuperpoderesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaSuperpoderesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
