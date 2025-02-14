export class Answer {
    isCorrect: boolean
    isSelected: boolean
    answer: string
    color: string

    constructor(isCorrect: boolean, answer: string){
        this.isCorrect = isCorrect;
        this.isSelected = false;
        this.answer = answer;
        this.color = "";
    }
}