import { Injectable, signal, Signal } from '@angular/core';
import { QuestionCriteria } from '../models/question-criteria';

@Injectable({
  providedIn: 'root'
})
export class QuestionCriteriaDataService {

  private questionCriteriaSignal = signal(new QuestionCriteria('4'));

  setQuestionCriteria(questionCriteria: QuestionCriteria) {
    this.questionCriteriaSignal.set(questionCriteria)
  }

  getQuestionCriteria() {
    return this.questionCriteriaSignal;
  }

}
