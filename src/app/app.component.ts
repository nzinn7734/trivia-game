import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from './Services/question.service';
import { Observable, Subscription, take } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { TriviaResponse } from './Models/trivia-response'

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatGridListModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [QuestionService]
})
export class AppComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  triviaResponse$: Observable<TriviaResponse> | undefined
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.newQuestion()
  }

  public checkCorrectAnswer() {
    console.log("check correct called");
  }

  public newQuestion() {
    this.triviaResponse$ = this.questionService.getQuestions().pipe(take(1))
  }

}
