export class Answer {
    private _correctAnswer!: boolean;
    private _value!: string;

    constructor(value: string, correctAnswer: boolean) {
        this._correctAnswer = correctAnswer;
        this._value = value;
    }

    get correctAnswer() {
        return this._correctAnswer;
    }

    get value() {
        return this._value;
    }
}
