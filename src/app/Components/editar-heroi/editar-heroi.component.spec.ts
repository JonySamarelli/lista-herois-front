import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHeroiComponent } from './editar-heroi.component';

describe('EditarHeroiComponent', () => {
  let component: EditarHeroiComponent;
  let fixture: ComponentFixture<EditarHeroiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarHeroiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarHeroiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
