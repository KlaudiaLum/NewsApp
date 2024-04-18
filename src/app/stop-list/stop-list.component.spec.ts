import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopListComponent } from './stop-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from 'src/service/news.service';
import { LibpisService } from 'src/service/libpis.service';

describe('StopListComponent', () => {
  let component: StopListComponent;
  let fixture: ComponentFixture<StopListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [StopListComponent],
      providers:[NewsService, LibpisService]
    });
    fixture = TestBed.createComponent(StopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
