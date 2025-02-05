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
    }
}