import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesHeroiComponent } from './detalhes-heroi.component';

describe('DetalhesHeroiComponent', () => {
  let component: DetalhesHeroiComponent;
  let fixture: ComponentFixture<DetalhesHeroiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesHeroiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesHeroiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
