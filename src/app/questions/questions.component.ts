import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { LIGHT_THEME_CORRECT, 
  LIGHT_THEME_INCORRECT, 
  DARK_THEME_CORRECT, 
  DARK_THEME_INCORRECT,
  LIGHT,
} from '../constants/theme';

@Component({
  selector: 'app-questions',
  imports: [CommonModule, MatProgressSpinnerModule, SafeHtmlPipe],
  templateUrl: './questions.component.html',
  providers: [QuestionService]
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]> | undefined;
  newQuestionDisabled = false;
  questions: Question[] = [];
  correctAnswers: number = 0;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.newQuestions()
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

  private currentThemeCorrect() {
    return document.getElementById("root")?.getAttribute("data-theme") === LIGHT ? LIGHT_THEME_CORRECT : DARK_THEME_CORRECT; 
  }

  private currentThemeIncorrect() {
    return document.getElementById("root")?.getAttribute("data-theme") === LIGHT ? LIGHT_THEME_INCORRECT : DARK_THEME_INCORRECT;
  }
}
