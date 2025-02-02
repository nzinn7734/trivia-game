import { Answer } from "./answer";

export class Question {
    private _type!: string;
    private _difficulty!: string;
    private _category!: string;
    private _question!: string;
    private _answers! : Answer[];

    constructor(json: string) {
        let jsonObj = JSON.parse(json);
        this._type = jsonObj.type;
        this._difficulty = jsonObj.difficulty;
        this._category = jsonObj.category;
        this._question = jsonObj.question;
        this._answers.push(new Answer(jsonObj.correct_answer, true));
        jsonObj.incorrect_answers.forEach((answer: string) => {
            this._answers.push(new Answer(answer, false));
        })
    }

    get type() {
        return this._type;
    }

    get difficulty() {
        return this._difficulty;
    }

    get catagory() {
        return this._category;
    }

    get question() {
        return this._question;
    } 

    get answers() {
        return this._answers;
    }
}
