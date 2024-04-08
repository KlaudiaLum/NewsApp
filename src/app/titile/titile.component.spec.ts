import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitileComponent } from './titile.component';

describe('TitileComponent', () => {
  let component: TitileComponent;
  let fixture: ComponentFixture<TitileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
