import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from './Services/question.service';
import { Subscription } from 'rxjs';
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
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  triviaResponse = {} as TriviaResponse;
  loading = true;
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.newQuestion()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if(!subscription.closed) {
        subscription.unsubscribe();
      }
    })
  }

  public checkCorrectAnswer() {
    console.log("check correct called");
  }

  public newQuestion() {
    this.subscriptions.push(
      this.questionService.getQuestions().subscribe(data => {
        this.triviaResponse = { ...data }
        console.log(this.triviaResponse);
        this.loading = false
    }))
  }

}
