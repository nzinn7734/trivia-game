import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from './Services/question.service';
import { Observable, Subscription, take } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { TriviaResponse } from './Models/trivia-response'
import { Question } from './Models/question';
import { Result } from './Models/result';
import { Answer } from './Models/answer';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatGridListModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [QuestionService]
})
export class AppComponent implements OnInit, OnDestroy {
  triviaResponse$: Observable<TriviaResponse> | undefined;
  subscriptions: Subscription[] = []
  isLoading = true;
  questions: Question[] = [];
  correctAnswers: number = 0;
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.newQuestions()
  }

    
  ngOnDestroy(): void {
    this.subscriptions?.forEach((subscription) => {
      if(!subscription.closed) {
        subscription.unsubscribe();
      }
    })
  }

  public checkCorrectAnswer(isCorrect: boolean) {
    console.log("check correct called");
    console.log("correct answer selected: " + isCorrect);
    if(isCorrect) {
      this.correctAnswers += 1;
    }
  }

  public newQuestions() {
    this.isLoading = true;
    this.questions = [];
    this.subscriptions.push(this.questionService.getQuestions().pipe(take(1))
                                .subscribe((response) => this.mapToQuestions(response)));
  }

  private mapToQuestions(response: TriviaResponse) {
    response.results.forEach((result) => {
      this.questions.push(new Question(result.type, result.difficulty, result.category, result.question, this.getAnswers(result.correct_answer, result.incorrect_answers)))
    })
    this.isLoading = false;
  }

  private getAnswers(correctAnswer: string, incorrectAnswers: string[]): Answer[] {
    let answers: Answer[] = [];
    answers.push(new Answer(true, correctAnswer))
    incorrectAnswers.forEach((answer) => {
      answers.push(new Answer(false, answer));
    })
    this.shuffel(answers);
    return answers;
  }

  private shuffel(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}
