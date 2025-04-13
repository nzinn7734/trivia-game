import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';
import { QuestionService } from '../services/question.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let questionService: QuestionService;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsComponent],
      providers: [QuestionService, HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    questionService = TestBed.inject(QuestionService)
    httpClient = TestBed.inject(HttpClient)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
