export class Answer {
    isCorrect: boolean
    isSelected: boolean
    answer: string
    color: string
    class: string

    constructor(isCorrect: boolean, answer: string){
        this.isCorrect = isCorrect;
        this.isSelected = false;
        this.answer = answer;
        this.color = "";
        this.class = "outline";
    }
}