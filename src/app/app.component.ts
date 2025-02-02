import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, CommonModule } from '@angular/common';
import { QuestionService } from './Services/question.service';
import { Observable } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { TriviaResponse } from './Models/trivia-response.model';

@Component({
  selector: 'app-root',
  imports: [JsonPipe, AsyncPipe, CommonModule, MatGridListModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [QuestionService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Trivia Game';
  response$: Observable<any> | undefined
  triviaResponse: TriviaResponse | undefined;
  loading = true;
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.newQuestion()
  }

  ngOnDestroy(): void {
   
  }

  public newQuestion() {
    this.response$ = this.questionService.getQuestions();
  }
}
