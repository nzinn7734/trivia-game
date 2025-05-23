export class QuestionCriteria {
    private _amount: string
    private _category?: number
    private _difficulty?: string
    private _type?: string

    constructor(amount: string) {
        this._amount = amount;
    }

    public get amount() {
        return this._amount;
    }

    public set amount(amount: string) {
        this._amount = amount;
    }

    public get category() {
        return this._category === undefined ? 0 : this._category
    }

    public set category(category: number) {
        this._category = category;
    }

    public get difficulty() {
        return this._difficulty === undefined ? '' : this._difficulty;
    }

    public set difficulty(difficulty: string) {
        this._difficulty = difficulty;
    }

    public get type() {
        return this._type === undefined ? '' : this._type;
    }

    public set type(type: string) {
        this._type = type;
    }
}