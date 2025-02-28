import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, take } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { QuestionService } from './Services/question.service';
import { SafeHtmlPipe } from './Pipes/safe-html.pipe';
import { TriviaResponse } from './Models/trivia-response'
import { Question } from './Models/question';
import { Answer } from './Models/answer';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatProgressSpinnerModule, SafeHtmlPipe, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [QuestionService]
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  isLoading = true;
  questions: Question[] = [];
  correctAnswers: number = 0;
  private theme = "dark";
  private darkThemeCorrect = "#2c7f21";
  private darkThemeIncorrect = "#822311"
  private lightThemeCorrect = "lightgreen"
  private lightThemeIncorrect = "lightcoral"
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

  public checkCorrectAnswer(question: Question, answer: Answer) {    
    if(!question.answered && answer.isCorrect) {
      this.correctAnswers += 1;
      answer.color = this.currentThemeCorrect();
      answer.isSelected = true;
    } else if (!question.answered) {
      answer.color = this.currentThemeIncorrect();
      answer.isSelected = true;
      question.answers.filter(answer => answer.isCorrect).forEach((correctAnswer) => {
        correctAnswer.color = this.currentThemeCorrect();
        correctAnswer.isSelected = true;
      });
    }
    question.answered = true;
  }

  public newQuestions() {
    this.isLoading = true;
    this.questions = [];
    this.subscriptions.push(this.questionService.getQuestions().pipe(take(1)).subscribe((response) => this.mapToQuestions(response)));
  }

  public themeToggle() {
    let currentTheme = document.getElementById("root")?.getAttribute("data-theme")
    let newTheme = currentTheme === "dark" ? "light" : "dark"
    this.theme = newTheme;
    this.questions.forEach((question) => {
      if(question.answered) {
        question.answers.forEach((answer) => {
          if(answer.isSelected) {
            if(answer.isCorrect) {
              answer.color = this.theme === "light" ? this.lightThemeCorrect : this.darkThemeCorrect;
            } else {
              answer.color = this.theme === "light" ? this.lightThemeIncorrect : this.darkThemeIncorrect;
            }
          }
        })
      }
    })
    document.getElementById("root")?.setAttribute("data-theme", newTheme);
  }

  private currentThemeCorrect() {
    return this.theme === "light" ? this.lightThemeCorrect : this.darkThemeCorrect; 
  }

  private currentThemeIncorrect() {
    return this.theme === "light" ? this.lightThemeIncorrect : this.darkThemeIncorrect;
  }

  private mapToQuestions(response: TriviaResponse) {
    response.results.forEach((result) => {
      this.questions.push(new Question(result.type, 
        result.difficulty, 
        result.category, 
        result.question,
        this.getAnswers(result.correct_answer, result.incorrect_answers)))
    })
    this.isLoading = false;
  }

  private getAnswers(correctAnswer: string, incorrectAnswers: string[]): Answer[] {
    let answers: Answer[] = [];
    answers.push(new Answer(true, correctAnswer))
    incorrectAnswers.forEach((answer) => {
      answers.push(new Answer(false, answer));
    })
    return answers;
  }
}
