export class Answer {
    isCorrect: boolean
    answer: string

    constructor(isCorrect: boolean, answer: string){
        this.isCorrect = isCorrect;
        this.answer = answer;
    }
}