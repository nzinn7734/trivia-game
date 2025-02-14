import { Answer } from "./answer"

export class Question {
    type: string
    difficulty: string
    category: string
    question: string
    answered: boolean
    answers: Answer[]

    constructor(type: string, difficulty: string, category: string, question: string, answers: Answer[]){
        this.type = type;
        this.difficulty = difficulty;
        this.category = category;
        this.question = question;
        this.answered = false;
        this.answers = answers;
        this.shuffleQuestions();
    }

    shuffleQuestions() {
        for (let i = this.answers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]];
        }
    }
}