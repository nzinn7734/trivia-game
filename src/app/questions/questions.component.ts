import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { TriviaCategoriesResponse } from '../models/trivia-categories';
import { Answer } from '../models/answer';

@Component({
  selector: 'app-questions',
  imports: [CommonModule, MatProgressSpinnerModule, SafeHtmlPipe],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
  providers: [QuestionService]
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]> | undefined;
  newQuestionDisabled = false;
  questions: Question[] = [];
  correctAnswers: number = 0;
  categories$: Observable<TriviaCategoriesResponse> | undefined;
  private theme = "dark";
  private darkThemeCorrect = "#2c7f21";
  private darkThemeIncorrect = "#822311";
  private lightThemeCorrect = "lightgreen";
  private lightThemeIncorrect = "lightcoral";

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.newQuestions()
    this.categories$ = this.questionService.getCategories()
  }

  public checkCorrectAnswer(question: Question, answer: Answer) {    
    if(!question.answered && answer.isCorrect) {
      this.correctAnswers += 1;
      answer.color = this.currentThemeCorrect();
      answer.isSelected = true;
      answer.class = "outline correct"
    } else if (!question.answered) {
      answer.color = this.currentThemeIncorrect();
      answer.isSelected = true;
      answer.class = "outline incorrect"
      question.answers.filter(answer => answer.isCorrect).forEach((correctAnswer) => {
        correctAnswer.color = this.currentThemeCorrect();
        correctAnswer.isSelected = true;
        correctAnswer.class = "outline correct"
      });
    }
    question.answered = true;
  }

  public newQuestions() {
    this.newQuestionDisabled = true;
    this.questions$ = this.questionService.getQuestionsObservable();
    setTimeout(() => this.newQuestionDisabled = false, 5000);
  }

  public themeToggle() {
    let currentTheme = document.getElementById("root")?.getAttribute("data-theme")
    let newTheme = currentTheme === "dark" ? "light" : "dark"
    this.theme = newTheme;
    let correctAnswers = document.getElementsByClassName("outline correct");
    let incorrectAnswers = document.getElementsByClassName("outline incorrect");
    for(var i = 0; i < correctAnswers.length; i++) {
      correctAnswers[i].setAttribute("style", "background-color:"+this.currentThemeCorrect())
    }
    for(var i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswers[i].setAttribute("style", "background-color:"+this.currentThemeIncorrect())
    }
    document.getElementById("root")?.setAttribute("data-theme", newTheme);
  }

  private currentThemeCorrect() {
    return this.theme === "light" ? this.lightThemeCorrect : this.darkThemeCorrect; 
  }

  private currentThemeIncorrect() {
    return this.theme === "light" ? this.lightThemeIncorrect : this.darkThemeIncorrect;
  }
}
