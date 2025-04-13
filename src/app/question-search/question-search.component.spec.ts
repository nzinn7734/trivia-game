import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSearchComponent } from './question-search.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('QuestionSearchComponent', () => {
  let component: QuestionSearchComponent;
  let fixture: ComponentFixture<QuestionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionSearchComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
