import { Question } from "./question.model";

export class TriviaResponse {
    private _response_code!: string;
    private _results!: Question[];

    constructor(json: any) {
        let jsonObj = JSON.parse(json);
        this._response_code = jsonObj.response_code;
        jsonObj.results.forEach((result: string) => {
            this._results.push(new Question(result))
        })
    }

    get responseCode() {
        return this._response_code;
    }

    get results() {
        return this._results;
    }

}
